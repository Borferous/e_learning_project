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
    getTableById('users','user_id');
}

function createUser()
{
    global $conn;

    // Decode JSON input if sent as raw JSON
    $data = json_decode(file_get_contents("php://input"), true) ?? $_POST;

    $name = $data['name'] ?? null;
    $password = $data['password'] ?? null;
    $address = $data['address'] ?? null;
    $user_role = $data['user_role'] ?? null;
    $email = $data['email'] ?? null;

    if (!$name || !$password || !$address || !$user_role || !$email) {
        sendError(422, 'Missing required fields');
    }

    $query = 'INSERT INTO users (name, password, address, user_role, email, profile_picture) VALUES (?, ?, ?, ?, ?, NULL)';

    if ($stmt = $conn->prepare($query)) {
        $stmt->bind_param("sssss", $name, $password, $address, $user_role, $email);
        if ($stmt->execute()) {
            echo json_encode(['message' => 'User created successfully!']);
        } else {
            sendError(500, 'Database error: ' . $stmt->error);
        }
        $stmt->close();
    } else {
        sendError(500, 'Database error: ' . $conn->error);
    }
    exit();
}

function deleteUser()
{
    global $conn;
    $data = json_decode(file_get_contents("php://input"), true) ?? $_POST;
    $id = $data['user_id'] ?? null;

    if (!$id) {
        sendError(422, 'Missing user_id');
    }

    $query = 'DELETE FROM users WHERE user_id = ?';
    if ($stmt = $conn->prepare($query)) {
        $stmt->bind_param("i", $id);
        if ($stmt->execute()) {
            echo json_encode(['message' => 'User deleted successfully!']);
        } else {
            sendError(500, 'Error: ' . $stmt->error);
        }
        $stmt->close();
    } else {
        sendError(500, 'Error: ' . $conn->error);
    }
    exit();
}

function updateUser()
{
    global $conn;
    $data = json_decode(file_get_contents("php://input"), true);

    $id = $data['user_id'] ?? null;
    $name = $data['name'] ?? null;
    $password = $data['password'] ?? null;
    $address = $data['address'] ?? null;
    $user_role = $data['user_role'] ?? null;
    $email = $data['email'] ?? null;

    if (!$id || !$name || !$password || !$address || !$user_role || !$email) {
        sendError(422, 'Missing required fields');
    }

    $query = 'UPDATE users SET name = ?, password = ?, address = ?, user_role = ?, email = ? WHERE user_id = ?';
    if ($stmt = $conn->prepare($query)) {
        $stmt->bind_param("sssssi", $name, $password, $address, $user_role, $email, $id);
        if ($stmt->execute()) {
            echo json_encode(['message' => 'User updated successfully!']);
        } else {
            sendError(500, 'Database error: ' . $stmt->error);
        }
        $stmt->close();
    } else {
        sendError(500, 'Database error: ' . $conn->error);
    }
    exit();
}

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


$method = $_SERVER['REQUEST_METHOD'];
$action = $_GET['action'] ?? null;

switch ($method) {
    case 'GET':
        switch ($action) {
            case 'get-all-users':
                getAllUsers();
                break;
            default:
                sendError(400, 'Invalid action');
        }
        break;

    case 'POST':
        switch ($action) {
            case 'get-user-by-id':
                getUserById();
                break;
            case 'create-user':
                createUser();
                break;
            case 'update-user':
                updateUser();
                break;
            case 'login-user':
                loginUser();
                break;
            default:
                sendError(400, 'Invalid action');
        }
        break;

    case 'DELETE':
        switch ($action) {
            case 'delete-user':
                deleteUser();
                break;
            default:
                sendError(400, 'Invalid action');
        }
        break;

    default:
        sendError(400, 'Invalid request method');
}
