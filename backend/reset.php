<?php

include './headers.php';
include './helper.php';
include './connection.php';

$tables = [
    'user_course',
    'users',
    'event',
    'course'
];

global $conn;

foreach ($tables as $table){
    $query = "DELETE FROM $table";
    if ($stmt = $conn->prepare($query)) {
        if (!$stmt->execute()) {
            sendError(500, 'Database error: ' . $stmt->error);
        }
        $stmt->close();
    } else {
        sendError(500, 'Database error: ' . $conn->error);
    }
}

exit(json_encode([
    'message' => 'Database reset successful',
]));

