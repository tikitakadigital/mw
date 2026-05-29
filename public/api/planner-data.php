<?php
// Returns the planner's self-submitted profile data (bio, services, name etc.)
// Only returns data for planners who have been approved via the claim flow.
// The frontend merges this with static data.ts to show the verified planner's own words.

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: https://mallorcawedding.co.uk');
header('Cache-Control: no-store');

$id = preg_replace('/[^a-z0-9_-]/', '', strtolower($_GET['id'] ?? ''));
if (!$id) { echo json_encode(null); exit; }

$status_file = dirname(__DIR__) . '/planner_data/status/' . $id . '.json';

if (!file_exists($status_file)) { echo json_encode(null); exit; }

$data = json_decode(file_get_contents($status_file), true);

// Only return profile data for verified planners
if (($data['status'] ?? '') !== 'verified' || empty($data['profile'])) {
  echo json_encode(null);
  exit;
}

// Return only non-empty profile fields
$profile = array_filter($data['profile'], fn($v) => !empty($v));
echo json_encode($profile);
