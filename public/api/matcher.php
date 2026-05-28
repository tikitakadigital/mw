<?php
define('RESEND_API_KEY', '%%RESEND_API_KEY%%');
define('ADMIN_EMAIL', 'hello@tikitaka.digital');
define('FROM_EMAIL', 'Mallorca Wedding <noreply@mallorcawedding.co.uk>');

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: https://mallorcawedding.co.uk');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { http_response_code(204); exit; }
if ($_SERVER['REQUEST_METHOD'] !== 'POST') { http_response_code(405); echo json_encode(['error' => 'Method not allowed']); exit; }

$data = json_decode(file_get_contents('php://input'), true);
if (!$data) { http_response_code(400); echo json_encode(['error' => 'Invalid JSON']); exit; }

$name     = htmlspecialchars(trim($data['name'] ?? ''));
$email    = filter_var(trim($data['email'] ?? ''), FILTER_VALIDATE_EMAIL);
$guests   = htmlspecialchars(trim($data['guests'] ?? ''));
$month    = htmlspecialchars(trim($data['month'] ?? ''));
$year     = htmlspecialchars(trim($data['year'] ?? ''));
$budget   = htmlspecialchars(trim($data['budget'] ?? ''));
$venue    = htmlspecialchars(trim($data['venueName'] ?? ''));
$planners = $data['planners'] ?? []; // array of {name, firm, location, price, id}

if (!$name || !$email) { http_response_code(400); echo json_encode(['error' => 'Name and email required']); exit; }

// Build planner cards for email
$plannerCards = '';
foreach ($planners as $i => $p) {
  $num  = $i + 1;
  $pName = htmlspecialchars($p['name'] ?? '');
  $firm  = htmlspecialchars($p['firm'] ?? '');
  $loc   = htmlspecialchars($p['location'] ?? '');
  $price = htmlspecialchars($p['price'] ?? '');
  $pid   = htmlspecialchars($p['id'] ?? '');
  $url   = 'https://mallorcawedding.co.uk/planner/' . $pid . '/';
  $plannerCards .= "
  <div style='border:1px solid #E4DDD4;border-radius:10px;padding:20px 24px;margin-bottom:12px'>
    <p style='margin:0 0 4px;font-size:11px;text-transform:uppercase;letter-spacing:0.1em;color:#6b7a3a;font-family:sans-serif'>Match #{$num}</p>
    <h3 style='margin:0 0 4px;font-size:20px;font-weight:400'>{$pName}</h3>
    <p style='margin:0 0 12px;font-size:14px;color:#8C7B6B;font-family:sans-serif'>{$firm} · {$loc} · From {$price}</p>
    <a href='{$url}' style='background:#6b7a3a;color:#fff;padding:10px 20px;border-radius:100px;text-decoration:none;font-size:13px;font-family:sans-serif'>View profile</a>
  </div>";
}

$coupleHtml = "
<div style='font-family:Georgia,serif;max-width:600px;margin:0 auto;color:#1A1512'>
  <div style='background:#6b7a3a;padding:28px 32px;border-radius:12px 12px 0 0'>
    <h1 style='color:#fff;margin:0;font-size:22px;font-weight:400'>Your Mallorca wedding planner matches</h1>
  </div>
  <div style='background:#fff;padding:32px;border:1px solid #E4DDD4;border-top:none;border-radius:0 0 12px 12px'>
    <p style='font-size:16px;line-height:1.7;margin:0 0 8px'>Hi {$name},</p>
    <p style='font-size:14px;color:#8C7B6B;font-family:sans-serif;margin:0 0 24px'>Based on your {$guests}-guest, {$month} {$year} wedding" . ($venue ? " at {$venue}" : '') . ".</p>
    {$plannerCards}
    <p style='font-size:14px;color:#8C7B6B;font-family:sans-serif;margin:24px 0 0;line-height:1.6'>Click any profile to read more about their style and send a request. No obligation.</p>
    <div style='margin-top:24px'>
      <a href='https://mallorcawedding.co.uk/planners/' style='border:1.5px solid #1A1512;color:#1A1512;padding:10px 22px;border-radius:100px;text-decoration:none;font-size:13px;font-family:sans-serif'>Browse the full directory</a>
    </div>
  </div>
  <p style='color:#8C7B6B;font-size:12px;text-align:center;margin-top:20px'>Mallorca Wedding · An independent guide to getting married in Mallorca<br>mallorcawedding.co.uk</p>
</div>";

// Admin notification
$adminHtml = "
<div style='font-family:Georgia,serif;max-width:600px;margin:0 auto;color:#1A1512'>
  <div style='background:#1A1512;padding:20px 28px;border-radius:12px 12px 0 0'>
    <h2 style='color:#fff;margin:0;font-size:18px;font-weight:400'>New matcher lead</h2>
  </div>
  <div style='background:#fff;padding:28px;border:1px solid #E4DDD4;border-top:none;border-radius:0 0 12px 12px'>
    <table style='width:100%;border-collapse:collapse'>
      <tr><td style='padding:8px 0;border-bottom:1px solid #F0EDE6;color:#8C7B6B;font-size:13px;width:120px'>Name</td><td style='padding:8px 0;border-bottom:1px solid #F0EDE6;font-size:13px'>{$name}</td></tr>
      <tr><td style='padding:8px 0;border-bottom:1px solid #F0EDE6;color:#8C7B6B;font-size:13px'>Email</td><td style='padding:8px 0;border-bottom:1px solid #F0EDE6;font-size:13px'><a href='mailto:{$email}' style='color:#6b7a3a'>{$email}</a></td></tr>
      <tr><td style='padding:8px 0;border-bottom:1px solid #F0EDE6;color:#8C7B6B;font-size:13px'>Wedding</td><td style='padding:8px 0;border-bottom:1px solid #F0EDE6;font-size:13px'>{$month} {$year} · {$guests} guests</td></tr>
      <tr><td style='padding:8px 0;border-bottom:1px solid #F0EDE6;color:#8C7B6B;font-size:13px'>Budget</td><td style='padding:8px 0;border-bottom:1px solid #F0EDE6;font-size:13px'>€{$budget}</td></tr>
      " . ($venue ? "<tr><td style='padding:8px 0;color:#8C7B6B;font-size:13px'>Venue</td><td style='padding:8px 0;font-size:13px'>{$venue}</td></tr>" : '') . "
    </table>
  </div>
</div>";

$errors = [];
foreach ([
  ['to' => $email,       'subject' => "Your Mallorca wedding planner matches, {$name}", 'html' => $coupleHtml],
  ['to' => ADMIN_EMAIL,  'subject' => "New matcher lead: {$name} · {$month} {$year} · {$guests} guests", 'html' => $adminHtml],
] as $mail) {
  $ch = curl_init('https://api.resend.com/emails');
  curl_setopt_array($ch, [
    CURLOPT_POST           => true,
    CURLOPT_POSTFIELDS     => json_encode(['from' => FROM_EMAIL, 'to' => [$mail['to']], 'subject' => $mail['subject'], 'html' => $mail['html']]),
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
