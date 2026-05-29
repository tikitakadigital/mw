<?php
define('RESEND_API_KEY', '%%RESEND_API_KEY%%');
define('ADMIN_EMAIL',    'hello@mallorcawedding.co.uk');
define('FROM_EMAIL',     'Mallorca Wedding <noreply@mallorcawedding.co.uk>');
define('SITE_URL',       'https://mallorcawedding.co.uk');

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: https://mallorcawedding.co.uk');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { http_response_code(204); exit; }
if ($_SERVER['REQUEST_METHOD'] !== 'POST') { http_response_code(405); echo json_encode(['error' => 'Method not allowed']); exit; }

$data = json_decode(file_get_contents('php://input'), true);
if (!$data) { http_response_code(400); echo json_encode(['error' => 'Invalid JSON']); exit; }

$id    = preg_replace('/[^a-z0-9_-]/', '', strtolower($data['plannerId'] ?? ''));
$name  = htmlspecialchars(trim($data['name'] ?? ''));
$firm  = htmlspecialchars(trim($data['firm'] ?? ''));
$email = filter_var(trim($data['email'] ?? ''), FILTER_VALIDATE_EMAIL);
$phone = htmlspecialchars(trim($data['phone'] ?? ''));
$website    = htmlspecialchars(trim($data['website'] ?? ''));
$instagram  = htmlspecialchars(trim($data['instagram'] ?? ''));
$bio        = htmlspecialchars(trim($data['bio'] ?? ''));
$languages  = htmlspecialchars(trim($data['languages'] ?? ''));
$based      = htmlspecialchars(trim($data['based'] ?? ''));
$services   = htmlspecialchars(trim($data['services'] ?? ''));
$plan       = htmlspecialchars(trim($data['plan'] ?? 'ppl')); // ppl | verified | premium

if (!$id || !$name || !$email) {
  http_response_code(400);
  echo json_encode(['error' => 'Name, email and planner ID required']);
  exit;
}

// Create data directories
$base_dir  = dirname(__DIR__) . '/planner_data';
$claims_dir = $base_dir . '/claims';
$status_dir = $base_dir . '/status';
foreach ([$base_dir, $claims_dir, $status_dir] as $dir) {
  if (!is_dir($dir)) mkdir($dir, 0755, true);
}

// Check not already verified
$status_file = $status_dir . '/' . $id . '.json';
if (file_exists($status_file)) {
  $existing = json_decode(file_get_contents($status_file), true);
  if (($existing['status'] ?? '') === 'verified') {
    http_response_code(409);
    echo json_encode(['error' => 'This profile is already verified']);
    exit;
  }
}

// Generate secure tokens
$approve_token = bin2hex(random_bytes(32));
$reject_token  = bin2hex(random_bytes(32));

// Save claim
$claim = [
  'id'             => $id,
  'name'           => $name,
  'firm'           => $firm,
  'email'          => $email,
  'phone'          => $phone,
  'website'        => $website,
  'instagram'      => $instagram,
  'bio'            => $bio,
  'languages'      => $languages,
  'based'          => $based,
  'services'       => $services,
  'plan'           => $plan,
  'approve_token'  => $approve_token,
  'reject_token'   => $reject_token,
  'claimed_at'     => date('c'),
  'status'         => 'pending',
];
file_put_contents($claims_dir . '/' . $id . '.json', json_encode($claim, JSON_PRETTY_PRINT));

// Update status to pending
file_put_contents($status_file, json_encode([
  'status'     => 'pending',
  'email'      => $email,
  'claimed_at' => date('c'),
]));

$approve_url = SITE_URL . '/api/approve.php?id=' . urlencode($id) . '&token=' . $approve_token;
$reject_url  = SITE_URL . '/api/reject.php?id='  . urlencode($id) . '&token=' . $reject_token;
$profile_url = SITE_URL . '/planner/' . $id . '/';

$plan_labels = ['ppl' => 'Pay-per-lead (€149/lead)', 'verified' => 'Verified Partner (€399/month)', 'premium' => 'Premium Partner (€899/month)'];
$plan_label  = $plan_labels[$plan] ?? $plan;

// ── Admin email ──────────────────────────────────────────────
$adminHtml = "
<div style='font-family:Georgia,serif;max-width:600px;margin:0 auto;color:#1A1512'>
  <div style='background:#6b7a3a;padding:24px 32px;border-radius:12px 12px 0 0'>
    <h1 style='color:#fff;margin:0;font-size:20px;font-weight:400'>New profile claim</h1>
  </div>
  <div style='background:#fff;padding:32px;border:1px solid #E4DDD4;border-top:none;border-radius:0 0 12px 12px'>
    <table style='width:100%;border-collapse:collapse'>
      <tr><td style='padding:10px 0;border-bottom:1px solid #EDE9E1;color:#8C7B6B;font-size:14px;width:130px'>Name</td><td style='padding:10px 0;border-bottom:1px solid #EDE9E1;font-size:14px'>{$name}</td></tr>
      <tr><td style='padding:10px 0;border-bottom:1px solid #EDE9E1;color:#8C7B6B;font-size:14px'>Firm</td><td style='padding:10px 0;border-bottom:1px solid #EDE9E1;font-size:14px'>{$firm}</td></tr>
      <tr><td style='padding:10px 0;border-bottom:1px solid #EDE9E1;color:#8C7B6B;font-size:14px'>Email</td><td style='padding:10px 0;border-bottom:1px solid #EDE9E1;font-size:14px'><a href='mailto:{$email}' style='color:#6b7a3a'>{$email}</a></td></tr>
      <tr><td style='padding:10px 0;border-bottom:1px solid #EDE9E1;color:#8C7B6B;font-size:14px'>Phone</td><td style='padding:10px 0;border-bottom:1px solid #EDE9E1;font-size:14px'>{$phone}</td></tr>
      <tr><td style='padding:10px 0;border-bottom:1px solid #EDE9E1;color:#8C7B6B;font-size:14px'>Website</td><td style='padding:10px 0;border-bottom:1px solid #EDE9E1;font-size:14px'><a href='{$website}' style='color:#6b7a3a'>{$website}</a></td></tr>
      <tr><td style='padding:10px 0;border-bottom:1px solid #EDE9E1;color:#8C7B6B;font-size:14px'>Instagram</td><td style='padding:10px 0;border-bottom:1px solid #EDE9E1;font-size:14px'>{$instagram}</td></tr>
      <tr><td style='padding:10px 0;border-bottom:1px solid #EDE9E1;color:#8C7B6B;font-size:14px'>Languages</td><td style='padding:10px 0;border-bottom:1px solid #EDE9E1;font-size:14px'>{$languages}</td></tr>
      <tr><td style='padding:10px 0;border-bottom:1px solid #EDE9E1;color:#8C7B6B;font-size:14px'>Based</td><td style='padding:10px 0;border-bottom:1px solid #EDE9E1;font-size:14px'>{$based}</td></tr>
      <tr><td style='padding:10px 0;border-bottom:1px solid #EDE9E1;color:#8C7B6B;font-size:14px'>Plan interest</td><td style='padding:10px 0;border-bottom:1px solid #EDE9E1;font-size:14px;color:#6b7a3a;font-weight:600'>{$plan_label}</td></tr>
    </table>
    " . ($bio ? "<div style='margin-top:16px;padding:16px;background:#F6F3EE;border-radius:8px;font-size:14px;line-height:1.6'><strong>Bio:</strong> {$bio}</div>" : '') . "
    " . ($services ? "<div style='margin-top:12px;padding:16px;background:#F6F3EE;border-radius:8px;font-size:14px;line-height:1.6'><strong>Services:</strong> {$services}</div>" : '') . "
    <div style='margin-top:28px'>
      <a href='{$profile_url}' style='display:inline-block;margin-bottom:12px;font-size:13px;color:#6b7a3a;font-family:sans-serif'>View profile →</a>
    </div>
    <div style='display:flex;gap:12px;margin-top:8px'>
      <a href='{$approve_url}' style='background:#6b7a3a;color:#fff;padding:12px 24px;border-radius:100px;text-decoration:none;font-size:14px;font-family:sans-serif;font-weight:600'>✓ Approve</a>
      <a href='{$reject_url}' style='background:#b8341d;color:#fff;padding:12px 24px;border-radius:100px;text-decoration:none;font-size:14px;font-family:sans-serif;font-weight:600'>✗ Reject</a>
    </div>
    <p style='font-size:12px;color:#8C7B6B;margin-top:16px;font-family:sans-serif'>These links expire after use. Store the claim data in /planner_data/claims/{$id}.json</p>
  </div>
</div>";

// ── Planner confirmation email ────────────────────────────────
$plannerHtml = "
<div style='font-family:Georgia,serif;max-width:600px;margin:0 auto;color:#1A1512'>
  <div style='background:#6b7a3a;padding:24px 32px;border-radius:12px 12px 0 0'>
    <h1 style='color:#fff;margin:0;font-size:20px;font-weight:400'>We received your claim</h1>
  </div>
  <div style='background:#fff;padding:32px;border:1px solid #E4DDD4;border-top:none;border-radius:0 0 12px 12px'>
    <p style='font-size:16px;line-height:1.7;margin:0 0 16px'>Hi {$name},</p>
    <p style='font-size:16px;line-height:1.7;margin:0 0 16px'>Thanks for claiming your profile on Mallorca Wedding. We review every application personally — typically within 1–2 business days.</p>
    <p style='font-size:16px;line-height:1.7;margin:0 0 24px'>Once verified, your profile will be:</p>
    <ul style='margin:0 0 24px;padding-left:20px;font-size:14px;line-height:2;font-family:sans-serif;color:#4A3F35'>
      <li>Live in the planner directory</li>
      <li>Included in the Smart Matcher for couples</li>
      <li>Accepting enquiries directly from your profile</li>
      <li>Eligible for your first 2 free leads</li>
    </ul>
    <p style='font-size:14px;color:#8C7B6B;margin:0 0 24px;font-family:sans-serif'>You expressed interest in <strong>{$plan_label}</strong>. We'll discuss this when we reach out to confirm your verification.</p>
    <a href='{$profile_url}' style='background:#6b7a3a;color:#fff;padding:12px 24px;border-radius:100px;text-decoration:none;font-size:14px;font-family:sans-serif;font-weight:600'>View your profile →</a>
  </div>
  <p style='color:#8C7B6B;font-size:12px;text-align:center;margin-top:20px;font-family:sans-serif'>Mallorca Wedding · mallorcawedding.co.uk</p>
</div>";

$errors = [];
foreach ([
  ['to' => ADMIN_EMAIL, 'subject' => "New claim: {$name} — {$firm} ({$plan_label})", 'html' => $adminHtml],
  ['to' => $email,      'subject' => "We received your Mallorca Wedding profile claim", 'html' => $plannerHtml],
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
  // Don't fail — claim is saved even if email fails
  echo json_encode(['ok' => true, 'email_warning' => 'Claim saved but email delivery failed']);
} else {
  echo json_encode(['ok' => true]);
}
