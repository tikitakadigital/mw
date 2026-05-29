<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: https://mallorcawedding.co.uk');
header('Cache-Control: no-store');

$id = preg_replace('/[^a-z0-9_-]/', '', strtolower($_GET['id'] ?? ''));
if (!$id) { echo json_encode(['status' => 'unclaimed']); exit; }

$status_file = dirname(__DIR__) . '/planner_data/status/' . $id . '.json';

if (file_exists($status_file)) {
  echo file_get_contents($status_file);
} else {
  echo json_encode(['status' => 'unclaimed']);
}
