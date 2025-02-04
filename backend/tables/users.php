<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");
include '../connection.php';


function getAllUsers($conn) {
    $query = 'SELECT * FROM users';
    $result = mysqli_query($conn, $query);

    $users = [];
    while ($row = mysqli_fetch_assoc($result)) {
        $users[] = $row;
    }

    return $users;
}


function getUserById($conn, $id) {
    $query = 'SELECT * FROM users WHERE user_id = ?';
    $stmt = mysqli_prepare($conn, $query);
    mysqli_stmt_bind_param($stmt, 'i', $id);
    mysqli_stmt_execute($stmt);
    $result = mysqli_stmt_get_result($stmt);

    return mysqli_fetch_assoc($result) ?: [];
}

// Get request parameters
$method = $_SERVER['REQUEST_METHOD'];
$action = $_GET['action'] ?? null;
$id = $_GET['user_id'] ?? null;

// Define routes
$routes = [
    'GET' => [
        'get-all-users' => fn() => getAllUsers($conn),
        'get-user-by-id' => fn() => getUserById($conn, $id),
    ]
];

// Process the request
if ($method === 'GET' && isset($routes['GET'][$action])) {
    $response = $routes['GET'][$action]();
    header('Content-Type: application/json');
    echo json_encode($response);
} else {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid request']);
}
