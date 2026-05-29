<?php
define('RESEND_API_KEY', '%%RESEND_API_KEY%%');
define('FROM_EMAIL', 'Mallorca Wedding <noreply@mallorcawedding.co.uk>');
define('SITE_URL',   'https://mallorcawedding.co.uk');

$id    = preg_replace('/[^a-z0-9_-]/', '', strtolower($_GET['id'] ?? ''));
$token = trim($_GET['token'] ?? '');

if (!$id || !$token) { http_response_code(400); echo 'Missing parameters'; exit; }

$claim_file  = dirname(__DIR__) . '/planner_data/claims/' . $id . '.json';
$status_file = dirname(__DIR__) . '/planner_data/status/' . $id . '.json';

if (!file_exists($claim_file)) { http_response_code(404); echo 'Claim not found'; exit; }

$claim = json_decode(file_get_contents($claim_file), true);

if (!hash_equals($claim['reject_token'] ?? '', $token)) {
  http_response_code(403);
  echo 'Invalid token';
  exit;
}

$claim['status']      = 'rejected';
$claim['rejected_at'] = date('c');
file_put_contents($claim_file, json_encode($claim, JSON_PRETTY_PRINT));

file_put_contents($status_file, json_encode([
  'status'      => 'unclaimed',
  'rejected_at' => date('c'),
]));

$name  = $claim['name'] ?? $id;
$email = $claim['email'] ?? '';

if ($email) {
  $html = "
  <div style='font-family:Georgia,serif;max-width:600px;margin:0 auto;color:#1A1512'>
    <div style='background:#1A1512;padding:24px 32px;border-radius:12px 12px 0 0'>
      <h1 style='color:#fff;margin:0;font-size:20px;font-weight:400'>Profile verification update</h1>
    </div>
    <div style='background:#fff;padding:32px;border:1px solid #E4DDD4;border-top:none;border-radius:0 0 12px 12px'>
      <p style='font-size:16px;line-height:1.7;margin:0 0 16px'>Hi {$name},</p>
      <p style='font-size:16px;line-height:1.7;margin:0 0 16px'>Thank you for applying to list your services on Mallorca Wedding. After reviewing your application, we weren't able to verify your listing at this time.</p>
      <p style='font-size:16px;line-height:1.7;margin:0 0 16px'>This may be because we couldn't confirm your business details, or your profile doesn't yet meet our verification standards.</p>
      <p style='font-size:14px;color:#8C7B6B;font-family:sans-serif;margin:0'>If you believe this is a mistake, please reply to this email and we'll review your application again.</p>
    </div>
    <p style='color:#8C7B6B;font-size:12px;text-align:center;margin-top:20px;font-family:sans-serif'>Mallorca Wedding · mallorcawedding.co.uk</p>
  </div>";

  $ch = curl_init('https://api.resend.com/emails');
  curl_setopt_array($ch, [
    CURLOPT_POST           => true,
    CURLOPT_POSTFIELDS     => json_encode(['from' => FROM_EMAIL, 'to' => [$email], 'subject' => "Your Mallorca Wedding application", 'html' => $html]),
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_HTTPHEADER     => ['Authorization: Bearer ' . RESEND_API_KEY, 'Content-Type: application/json'],
  ]);
  curl_exec($ch);
  curl_close($ch);
}

header('Content-Type: text/html');
echo "<!DOCTYPE html><html><head><meta charset='utf-8'><title>Rejected</title>
<style>body{font-family:Georgia,serif;max-width:480px;margin:80px auto;padding:0 24px;color:#1A1512}
h1{font-style:italic} </style></head><body>
<h1>Application rejected</h1>
<p><strong>{$name}</strong>'s application has been declined. A notification email has been sent to {$email}.</p>
</body></html>";
