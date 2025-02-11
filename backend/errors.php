<?php

function sendError($code, $message) {
    header('Content-Type: application/json');
    http_response_code($code);
    exit(json_encode(['error' => $message]));
}