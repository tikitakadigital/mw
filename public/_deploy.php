<?php
define('SECRET', '%%DEPLOY_SECRET%%');

if (
    empty($_SERVER['HTTP_X_DEPLOY_SECRET']) ||
    !hash_equals(SECRET, $_SERVER['HTTP_X_DEPLOY_SECRET'])
) {
    http_response_code(403);
    exit('Forbidden');
}

set_time_limit(180);
ini_set('memory_limit', '256M');

$zip_file = isset($_SERVER['HTTP_X_DEPLOY_FILE']) ? basename($_SERVER['HTTP_X_DEPLOY_FILE']) : '';
if (!$zip_file || !preg_match('/^deploy_[0-9]+\.zip$/', $zip_file)) {
    http_response_code(400);
    exit('Missing or invalid X-Deploy-File header');
}

// ZIP is uploaded one level above public_html (home directory)
$zip_path = dirname(__DIR__) . '/' . $zip_file;
if (!file_exists($zip_path)) {
    http_response_code(404);
    exit('Deploy file not found: ' . $zip_path);
}

$zip = new ZipArchive();
if ($zip->open($zip_path) !== true) {
    http_response_code(500);
    exit('ZIP open failed');
}

$zip->extractTo(__DIR__);
$zip->close();

// Clean up all deploy ZIPs
foreach (glob(dirname(__DIR__) . '/deploy_*.zip') as $f) {
    @unlink($f);
}

// Fix permissions recursively
$iter = new RecursiveIteratorIterator(
    new RecursiveDirectoryIterator(__DIR__, RecursiveDirectoryIterator::SKIP_DOTS),
    RecursiveIteratorIterator::SELF_FIRST
);
foreach ($iter as $item) {
    @chmod($item->getPathname(), $item->isDir() ? 0755 : 0644);
}
@chmod(__DIR__, 0755);

header('Content-Type: text/plain');
echo 'Deployed at ' . gmdate('Y-m-d H:i:s') . ' UTC';
