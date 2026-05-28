<?php
define('GOOGLE_API_KEY', '%%GOOGLE_API_KEY%%');

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: https://mallorcawedding.co.uk');
header('Cache-Control: public, max-age=86400'); // CDN can cache for 24h

$id = preg_replace('/[^a-z0-9_-]/', '', $_GET['id'] ?? '');
if (!$id) { http_response_code(400); echo json_encode(['error' => 'Missing id']); exit; }

// Map planner ID → config
$planners = [
  'awhitehotwedding' => [
    'query'    => 'A White Hot Wedding',
    'place_id' => null, // filled automatically on first run
    'location' => '39.6135,2.5820', // Mallorca lat/lng
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

// Step 1: Find the Place ID
$place_id = $config['place_id'];

if (!$place_id) {
  // Try findplacefromtext (most precise for specific business names)
  $find_url = 'https://maps.googleapis.com/maps/api/place/findplacefromtext/json?'
    . http_build_query([
        'input'     => $config['query'],
        'inputtype' => 'textquery',
        'fields'    => 'place_id,name',
        'locationbias' => 'circle:50000@' . $config['location'],
        'key'       => GOOGLE_API_KEY,
        'language'  => 'en',
      ]);

  $find_resp = @file_get_contents($find_url);
  $find_data = $find_resp ? json_decode($find_resp, true) : null;
  $place_id  = $find_data['candidates'][0]['place_id'] ?? null;
}

if (!$place_id) {
  // Fallback: text search
  $search_url = 'https://maps.googleapis.com/maps/api/place/textsearch/json?'
    . http_build_query([
        'query'    => $config['query'] . ' Mallorca Spain',
        'key'      => GOOGLE_API_KEY,
        'language' => 'en',
      ]);
  $search_resp = @file_get_contents($search_url);
  $search_data = $search_resp ? json_decode($search_resp, true) : null;
  $place_id    = $search_data['results'][0]['place_id'] ?? null;
}

if (!$place_id) {
  http_response_code(502);
  echo json_encode(['error' => 'Place not found', 'debug' => $find_data ?? null]);
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
