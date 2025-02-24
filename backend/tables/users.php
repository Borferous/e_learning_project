<?php

include '../headers.php';
include '../connection.php';
include '../helper.php';

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

function getAllUsers() { getFromTable('users'); }
function getUserById() { getTableById('users','user_id'); }
function createUser() { createData('users', ['name', 'password', 'address', 'user_role', 'email']); }
function deleteUser() { deleteById('users','user_id'); }
function updateUser() { updateData('users', 'user_id', ['name', 'password', 'address', 'user_role', 'email']); }

function loginUser()
{
    global $conn;

    // Decode JSON input
    $data = json_decode(file_get_contents("php://input"), true) ?? $_POST;

    $email = $data['email'] ?? null;
    $password = $data['password'] ?? null;

    if (!$email || !$password) {
        sendError(422, 'Missing email or password');
    }

    $query = 'SELECT user_id, name, password, user_role FROM users WHERE email = ?';
    if ($stmt = $conn->prepare($query)) {
        $stmt->bind_param("s", $email);
        $stmt->execute();
        $result = $stmt->get_result();
        $user = $result->fetch_assoc();
        $stmt->close();

        if (!$user) {
            sendError(401, 'Invalid email or password');
        }

        // Verify password (assuming you use password_hash during registration)
        if ($password !== $user['password']) {
            sendError(401, 'Invalid email or password');
        }

        // Successful login response
        echo json_encode([
            'message' => 'Login successful',
            'user' => [
                'user_id' => $user['user_id'],
                'name' => $user['name'],
                'user_role' => $user['user_role'],
            ]
        ]);
        exit();
    } else {
        sendError(500, 'Database error: ' . $conn->error);
    }
}

function enrollUser() {

}

$method = $_SERVER['REQUEST_METHOD'];
$action = $_GET['action'] ?? null;

// Define allowed actions as a dictionary
$routes = [
    'GET' => [
        'get-all-users' => 'getAllUsers',
    ],
    'POST' => [
        'enroll-user' => 'enrollUser',
        'get-user-by-id' => 'getUserById',
        'create-user' => 'createUser',
        'update-user' => 'updateUser',
        'login-user' => 'loginUser',
    ],
    'DELETE' => [
        'delete-user' => 'deleteUser',
    ],
];

// Check if the method exists and contains the action
if (isset($routes[$method][$action])) {
    call_user_func($routes[$method][$action]);
} else {
    sendError(400, 'Invalid request method or action');
}
