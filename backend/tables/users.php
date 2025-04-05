<?php

include '../headers.php';
include '../connection.php';
include '../helper.php';

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

function getAllUsers()
{
    getFromTable('users');
}
function getUserById()
{
    getTableById('users', 'user_id');
}
function createUser()
{
    createData('users', ['name', 'password', 'address', 'user_role', 'email','birth_date', 'gender','phone_number']);
}
function deleteUser()
{
    deleteById('users', 'user_id');
}
function updateUser()
{
    updateData('users', 'user_id', ['name', 'password', 'address', 'user_role', 'email','status','birth_date','gender','phone_number']);
}

function startSessionIfNotActive()
{
    if (session_status() === PHP_SESSION_NONE) {
        session_start();
    }
}

function getUserRole()
{
    startSessionIfNotActive(); // Ensure session is started
    global $conn;

    if (!isset($_SESSION['user_id'])) {
        return null; // User not logged in
    }

    $query = 'SELECT user_role FROM users WHERE user_id = ?';
    if ($stmt = $conn->prepare($query)) {
        $stmt->bind_param("i", $_SESSION['user_id']);
        $stmt->execute();
        $result = $stmt->get_result();
        $user = $result->fetch_assoc();
        $stmt->close();

        return $user['user_role'] ?? null; // Return role if found, otherwise null
    }

    return null; // Return null on database error
}

function loginUser()
{
    startSessionIfNotActive(); // Ensure session is started

    global $conn;
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

        if (!$user || $password !== $user['password']) {
            sendError(401, 'Invalid email or password');
        }

        // Store user ID in session
        $_SESSION['user_id'] = $user['user_id'];

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

function getCurrentUser()
{
    startSessionIfNotActive(); // Ensure session is started
    global $conn;

    if (!isset($_SESSION['user_id'])) {
        sendError(401, 'User not logged in');
    }

    $query = 'SELECT user_id, name, user_role FROM users WHERE user_id = ?';
    if ($stmt = $conn->prepare($query)) {
        $stmt->bind_param("i", $_SESSION['user_id']);
        $stmt->execute();
        $result = $stmt->get_result();
        $user = $result->fetch_assoc();
        $stmt->close();

        if (!$user) {
            sendError(404, 'User not found');
        }

        echo json_encode(['user' => $user]);
        exit();
    } else {
        sendError(500, 'Database error: ' . $conn->error);
    }
}

function logoutUser()
{
    startSessionIfNotActive(); // Ensure session is started

    // Unset all session variables
    $_SESSION = [];

    // Destroy the session
    session_destroy();

    echo json_encode(['message' => 'Logout successful']);
    exit();
}

$method = $_SERVER['REQUEST_METHOD'];
$action = $_GET['action'] ?? null;

// Define allowed actions as a dictionary
$routes = [
    'GET' => [
        'get-all-users' => 'getAllUsers',
        'get-current-user' => 'getCurrentUser',
    ],
    'POST' => [
        'get-user-by-id' => 'getUserById',
        'create-user' => 'createUser',
        'update-user' => 'updateUser',
        'login-user' => 'loginUser',
        'logout-user' => 'logoutUser'
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
