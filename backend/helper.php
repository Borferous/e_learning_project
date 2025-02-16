<?php

function sendError($code, $message) {
    header('Content-Type: application/json');
    http_response_code($code);
    exit(json_encode(['error' => $message]));
}

function getFromTable($table) {
    global $conn;
    $query = "SELECT * FROM $table";
    $result = mysqli_query($conn, $query);
    $values = [];
    while ($row = mysqli_fetch_assoc($result)) {
        $values[] = $row;
    }
    echo json_encode($values);
    exit;
}

function getTableById($table,$pk_name){
    global $conn;
    $data = json_decode(file_get_contents("php://input"), true);
    $id = $data[$pk_name] ?? null;

    if (!$id) {
        sendError(422,"Missing Id");
    }

    $query = "SELECT * FROM $table WHERE $pk_name = ?";
    $stmt = mysqli_prepare($conn, $query);
    mysqli_stmt_bind_param($stmt, 'i', $id);
    mysqli_stmt_execute($stmt);
    $result = mysqli_stmt_get_result($stmt);

    $output = mysqli_fetch_assoc($result) ?: [];

    echo json_encode($output);
    exit();
}