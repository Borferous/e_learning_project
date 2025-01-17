<?php
    header('Access-Control-Allow-Origin: http://localhost:5173');
    header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type');

    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        exit; // Allow preflight request to pass
    }

    $name = $_GET['name'] ?? 'Guest';
    echo "Hello, " . htmlspecialchars($name);
?>
