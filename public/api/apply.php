<?php
define('RESEND_API_KEY', '%%RESEND_API_KEY%%');
define('ADMIN_EMAIL', 'hello@mallorcawedding.co.uk');
define('FROM_EMAIL', 'Mallorca Wedding <noreply@mallorcawedding.co.uk>');

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: https://mallorcawedding.co.uk');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { http_response_code(204); exit; }
if ($_SERVER['REQUEST_METHOD'] !== 'POST') { http_response_code(405); echo json_encode(['error' => 'Method not allowed']); exit; }

$data = json_decode(file_get_contents('php://input'), true);
if (!$data) { http_response_code(400); echo json_encode(['error' => 'Invalid JSON']); exit; }

$name      = htmlspecialchars(trim($data['name'] ?? ''));
$company   = htmlspecialchars(trim($data['company'] ?? ''));
$based     = htmlspecialchars(trim($data['based'] ?? ''));
$languages = htmlspecialchars(trim($data['languages'] ?? ''));
$minBudget = htmlspecialchars(trim($data['minBudget'] ?? ''));
$maxGuests = htmlspecialchars(trim($data['maxGuests'] ?? ''));
$portfolio = htmlspecialchars(trim($data['portfolio'] ?? ''));
$styles    = htmlspecialchars(implode(', ', (array)($data['styles'] ?? [])));
$description = htmlspecialchars(trim($data['description'] ?? ''));

if (!$name) { http_response_code(400); echo json_encode(['error' => 'Name required']); exit; }

$adminHtml = "
<div style='font-family:Georgia,serif;max-width:600px;margin:0 auto;color:#1A1512'>
  <div style='background:#6b7a3a;padding:28px 32px;border-radius:12px 12px 0 0'>
    <h1 style='color:#fff;margin:0;font-size:22px;font-weight:400'>New planner application</h1>
  </div>
  <div style='background:#fff;padding:32px;border:1px solid #E4DDD4;border-top:none;border-radius:0 0 12px 12px'>
    <table style='width:100%;border-collapse:collapse'>
      <tr><td style='padding:10px 0;border-bottom:1px solid #F0EDE6;color:#8C7B6B;font-size:14px;width:140px'>Name</td><td style='padding:10px 0;border-bottom:1px solid #F0EDE6;font-size:14px'>{$name}</td></tr>
      <tr><td style='padding:10px 0;border-bottom:1px solid #F0EDE6;color:#8C7B6B;font-size:14px'>Company</td><td style='padding:10px 0;border-bottom:1px solid #F0EDE6;font-size:14px'>{$company}</td></tr>
      <tr><td style='padding:10px 0;border-bottom:1px solid #F0EDE6;color:#8C7B6B;font-size:14px'>Based</td><td style='padding:10px 0;border-bottom:1px solid #F0EDE6;font-size:14px'>{$based}</td></tr>
      <tr><td style='padding:10px 0;border-bottom:1px solid #F0EDE6;color:#8C7B6B;font-size:14px'>Languages</td><td style='padding:10px 0;border-bottom:1px solid #F0EDE6;font-size:14px'>{$languages}</td></tr>
      <tr><td style='padding:10px 0;border-bottom:1px solid #F0EDE6;color:#8C7B6B;font-size:14px'>Min budget</td><td style='padding:10px 0;border-bottom:1px solid #F0EDE6;font-size:14px'>{$minBudget}</td></tr>
      <tr><td style='padding:10px 0;border-bottom:1px solid #F0EDE6;color:#8C7B6B;font-size:14px'>Max guests</td><td style='padding:10px 0;border-bottom:1px solid #F0EDE6;font-size:14px'>{$maxGuests}</td></tr>
      <tr><td style='padding:10px 0;border-bottom:1px solid #F0EDE6;color:#8C7B6B;font-size:14px'>Styles</td><td style='padding:10px 0;border-bottom:1px solid #F0EDE6;font-size:14px'>{$styles}</td></tr>
      " . ($portfolio ? "<tr><td style='padding:10px 0;border-bottom:1px solid #F0EDE6;color:#8C7B6B;font-size:14px'>Portfolio</td><td style='padding:10px 0;border-bottom:1px solid #F0EDE6;font-size:14px'><a href='{$portfolio}' style='color:#6b7a3a'>{$portfolio}</a></td></tr>" : '') . "
    </table>
    " . ($description ? "<div style='margin-top:20px;padding:16px 20px;background:#F6F3EE;border-radius:8px;font-size:14px;line-height:1.6'><strong>Ideal couple:</strong><br>{$description}</div>" : '') . "
  </div>
  <p style='color:#8C7B6B;font-size:12px;text-align:center;margin-top:20px'>Mallorca Wedding · mallorcawedding.co.uk</p>
</div>";

$ch = curl_init('https://api.resend.com/emails');
curl_setopt_array($ch, [
  CURLOPT_POST           => true,
  CURLOPT_POSTFIELDS     => json_encode(['from' => FROM_EMAIL, 'to' => [ADMIN_EMAIL], 'subject' => "New planner application: {$name} — {$company}", 'html' => $adminHtml]),
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_HTTPHEADER     => ['Authorization: Bearer ' . RESEND_API_KEY, 'Content-Type: application/json'],
]);
$result = curl_exec($ch);
$status = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

if ($status >= 400) {
  http_response_code(500);
  echo json_encode(['error' => 'Email failed', 'detail' => $result]);
} else {
  echo json_encode(['ok' => true]);
}
