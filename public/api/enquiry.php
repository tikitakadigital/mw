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

$name        = htmlspecialchars(trim($data['name'] ?? ''));
$email       = filter_var(trim($data['email'] ?? ''), FILTER_VALIDATE_EMAIL);
$planner     = htmlspecialchars(trim($data['plannerName'] ?? ''));
$plannerId   = htmlspecialchars(trim($data['plannerId'] ?? ''));
$date        = htmlspecialchars(trim($data['date'] ?? ''));
$guests      = htmlspecialchars(trim($data['guests'] ?? ''));
$style       = htmlspecialchars(trim($data['style'] ?? ''));
$message     = htmlspecialchars(trim($data['message'] ?? ''));

if (!$name || !$email) { http_response_code(400); echo json_encode(['error' => 'Name and email required']); exit; }

$profileUrl = 'https://mallorcawedding.co.uk/planner/' . $plannerId . '/';

// Email to admin
$adminHtml = "
<div style='font-family:Georgia,serif;max-width:600px;margin:0 auto;color:#1A1512'>
  <div style='background:#6b7a3a;padding:28px 32px;border-radius:12px 12px 0 0'>
    <h1 style='color:#fff;margin:0;font-size:22px;font-weight:400'>New enquiry — {$planner}</h1>
  </div>
  <div style='background:#fff;padding:32px;border:1px solid #E4DDD4;border-top:none;border-radius:0 0 12px 12px'>
    <table style='width:100%;border-collapse:collapse'>
      <tr><td style='padding:10px 0;border-bottom:1px solid #F0EDE6;color:#8C7B6B;width:140px;font-size:14px'>From</td><td style='padding:10px 0;border-bottom:1px solid #F0EDE6;font-size:14px'>{$name} &lt;{$email}&gt;</td></tr>
      <tr><td style='padding:10px 0;border-bottom:1px solid #F0EDE6;color:#8C7B6B;font-size:14px'>Planner</td><td style='padding:10px 0;border-bottom:1px solid #F0EDE6;font-size:14px'><a href='{$profileUrl}' style='color:#6b7a3a'>{$planner}</a></td></tr>
      <tr><td style='padding:10px 0;border-bottom:1px solid #F0EDE6;color:#8C7B6B;font-size:14px'>Wedding date</td><td style='padding:10px 0;border-bottom:1px solid #F0EDE6;font-size:14px'>{$date}</td></tr>
      <tr><td style='padding:10px 0;border-bottom:1px solid #F0EDE6;color:#8C7B6B;font-size:14px'>Guests</td><td style='padding:10px 0;border-bottom:1px solid #F0EDE6;font-size:14px'>{$guests}</td></tr>
      <tr><td style='padding:10px 0;border-bottom:1px solid #F0EDE6;color:#8C7B6B;font-size:14px'>Style</td><td style='padding:10px 0;border-bottom:1px solid #F0EDE6;font-size:14px'>{$style}</td></tr>
    </table>
    " . ($message ? "<div style='margin-top:20px;padding:16px 20px;background:#F6F3EE;border-radius:8px;font-size:14px;line-height:1.6'>{$message}</div>" : '') . "
    <div style='margin-top:24px'>
      <a href='mailto:{$email}' style='background:#6b7a3a;color:#fff;padding:12px 24px;border-radius:100px;text-decoration:none;font-size:14px;font-family:sans-serif'>Reply to {$name}</a>
    </div>
  </div>
  <p style='color:#8C7B6B;font-size:12px;text-align:center;margin-top:20px'>Mallorca Wedding · mallorcawedding.co.uk</p>
</div>";

// Confirmation to couple
$coupleHtml = "
<div style='font-family:Georgia,serif;max-width:600px;margin:0 auto;color:#1A1512'>
  <div style='background:#6b7a3a;padding:28px 32px;border-radius:12px 12px 0 0'>
    <h1 style='color:#fff;margin:0;font-size:22px;font-weight:400'>Request sent to {$planner}</h1>
  </div>
  <div style='background:#fff;padding:32px;border:1px solid #E4DDD4;border-top:none;border-radius:0 0 12px 12px'>
    <p style='font-size:16px;line-height:1.7;margin:0 0 20px'>Hi {$name},</p>
    <p style='font-size:16px;line-height:1.7;margin:0 0 20px'>We've passed your details to <strong>{$planner}</strong>. They typically reply within 24 hours.</p>
    <p style='font-size:16px;line-height:1.7;margin:0 0 28px'>In the meantime, you can browse their full profile or explore other planners on the directory.</p>
    <a href='{$profileUrl}' style='background:#6b7a3a;color:#fff;padding:12px 24px;border-radius:100px;text-decoration:none;font-size:14px;font-family:sans-serif'>View {$planner}'s profile</a>
  </div>
  <p style='color:#8C7B6B;font-size:12px;text-align:center;margin-top:20px'>Mallorca Wedding · An independent guide to getting married in Mallorca</p>
</div>";

$errors = [];

foreach ([
  ['to' => ADMIN_EMAIL, 'subject' => "New enquiry: {$name} → {$planner}", 'html' => $adminHtml, 'reply_to' => $email],
  ['to' => $email,      'subject' => "Your request to {$planner} has been sent", 'html' => $coupleHtml],
] as $mail) {
  $payload = [
    'from'    => FROM_EMAIL,
    'to'      => [$mail['to']],
    'subject' => $mail['subject'],
    'html'    => $mail['html'],
  ];
  if (!empty($mail['reply_to'])) $payload['reply_to'] = $mail['reply_to'];

  $ch = curl_init('https://api.resend.com/emails');
  curl_setopt_array($ch, [
    CURLOPT_POST           => true,
    CURLOPT_POSTFIELDS     => json_encode($payload),
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_HTTPHEADER     => ['Authorization: Bearer ' . RESEND_API_KEY, 'Content-Type: application/json'],
  ]);
  $result = curl_exec($ch);
  $status = curl_getinfo($ch, CURLINFO_HTTP_CODE);
  curl_close($ch);
  if ($status >= 400) $errors[] = $result;
}

if ($errors) {
  http_response_code(500);
  echo json_encode(['error' => 'Email failed', 'detail' => $errors]);
} else {
  echo json_encode(['ok' => true]);
}
