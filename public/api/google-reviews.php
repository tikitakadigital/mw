<?php
define('GOOGLE_API_KEY', '%%GOOGLE_API_KEY%%');

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: https://mallorcawedding.co.uk');
header('Cache-Control: public, max-age=86400'); // CDN can cache for 24h

$id = preg_replace('/[^a-z0-9_-]/', '', $_GET['id'] ?? '');
if (!$id) { http_response_code(400); echo json_encode(['error' => 'Missing id']); exit; }

// Map planner ID → config
// place_id: get from Google Maps URL data param → !1s hex → ChIJ conversion
// lat/lng: exact pin coordinates from Google Maps URL
$planners = [
  'awhitehotwedding' => [
    'query'    => 'A White Hot Wedding',
    'place_id' => 'ChIJK86j35STrGM',   // derived from Maps URL CID
    'lat'      => '39.613498',
    'lng'      => '2.9116515',
  ],
];

if (!isset($planners[$id])) { http_response_code(404); echo json_encode(['error' => 'No Google profile for this planner']); exit; }

$config = $planners[$id];

// Cache file — refresh every 24 hours
$cache_file = sys_get_temp_dir() . '/mw_reviews_' . $id . '.json';
if (file_exists($cache_file) && (time() - filemtime($cache_file)) < 86400) {
  echo file_get_contents($cache_file);
  exit;
}

// Step 1: Find the Place ID — try hardcoded first, then nearby search, then text search
$place_id = $config['place_id'];

// Verify hardcoded place_id works, or find via nearby search
if (!$place_id || strlen($place_id) < 20) {
  // Nearby search at exact coordinates — most reliable
  $nearby_url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?'
    . http_build_query([
        'location' => $config['lat'] . ',' . $config['lng'],
        'radius'   => '100',
        'keyword'  => $config['query'],
        'key'      => GOOGLE_API_KEY,
        'language' => 'en',
      ]);
  $nearby_resp = @file_get_contents($nearby_url);
  $nearby_data = $nearby_resp ? json_decode($nearby_resp, true) : null;
  $place_id    = $nearby_data['results'][0]['place_id'] ?? null;
}

if (!$place_id) {
  // Last resort: text search
  $search_url = 'https://maps.googleapis.com/maps/api/place/textsearch/json?'
    . http_build_query(['query' => $config['query'] . ' Mallorca', 'key' => GOOGLE_API_KEY, 'language' => 'en']);
  $search_resp = @file_get_contents($search_url);
  $search_data = $search_resp ? json_decode($search_resp, true) : null;
  $place_id    = $search_data['results'][0]['place_id'] ?? null;
}

if (!$place_id) {
  http_response_code(502);
  echo json_encode(['error' => 'Place not found', 'nearby_debug' => $nearby_data ?? null]);
  exit;
}

// Step 2: Fetch Place Details (reviews + rating)
$details_url = 'https://maps.googleapis.com/maps/api/place/details/json?'
  . http_build_query([
      'place_id' => $place_id,
      'fields'   => 'name,rating,user_ratings_total,reviews',
      'key'      => GOOGLE_API_KEY,
      'language' => 'en',
      'reviews_sort' => 'most_relevant',
    ]);

$details_resp = @file_get_contents($details_url);
if (!$details_resp) { http_response_code(502); echo json_encode(['error' => 'Google details unreachable']); exit; }

$details = json_decode($details_resp, true);
$raw_reviews = $details['result']['reviews'] ?? [];
$overall_rating = $details['result']['rating'] ?? null;
$total_reviews  = $details['result']['user_ratings_total'] ?? null;

// Shape into our review format
$reviews = array_map(function($r) {
  return [
    'name'   => $r['author_name'] ?? 'Google reviewer',
    'date'   => date('Y', $r['time'] ?? time()),
    'guests' => 0,
    'venue'  => 'Mallorca',
    'body'   => $r['text'] ?? '',
    'stars'  => $r['rating'] ?? 5,
    'source' => 'google',
  ];
}, array_filter($raw_reviews, fn($r) => !empty($r['text'])));

$output = json_encode([
  'reviews'       => array_values($reviews),
  'rating'        => $overall_rating,
  'total_reviews' => $total_reviews,
  'place_id'      => $place_id,
  'fetched_at'    => date('c'),
]);

// Write cache
file_put_contents($cache_file, $output);

echo $output;
