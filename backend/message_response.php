<?php
    include_once 'headers.php';

    function successMessage($message, $data = null){
        http_response_code(200);
        return json_encode([
            'status' => 'success',
            'message' => $message,
            'data' => $data
        ]);
        exit;
    }

    function errorMessage($message, $code = 400){
        http_response_code($code);
        return json_encode([
            'status' => 'error',
            'message' => $message
        ]);
        exit;
    }
?>