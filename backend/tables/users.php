<?php
header("Access-Control-Allow-Origin: *"); 
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS"); 
header("Access-Control-Allow-Headers: Content-Type, Authorization"); 

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit(); 
}

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

function createUser($conn, $name, $password, $address, $user_role, $email) {
    // SQL query to insert a new user
    $query = 'INSERT INTO users (user_id, name, password, address, user_role, email, profile_picture) 
              VALUES (NULL, ?, ?, ?, ?, ?, NULL)';

    // Prepare and bind parameters
    if ($stmt = $conn->prepare($query)) {
        $stmt->bind_param("sssss", $name, $password, $address, $user_role, $email);

        // Execute the query
        if ($stmt->execute()) {
            echo json_encode(['message' => 'User created successfully!']);
        } else {
            echo json_encode(['error' => 'Error: ' . $stmt->error]);
        }

        // Close the statement
        $stmt->close();
    } else {
        echo json_encode(['error' => 'Error: ' . $conn->error]);
    }
}

function deleteUser($conn, $id) {
    $query = 'DELETE FROM users WHERE user_id = ?;';
    if ($stmt = $conn->prepare($query)) {
        $stmt->bind_param("i", $id);
        if ($stmt->execute()) {
            echo json_encode(['message' => 'User deleted successfully!']);
        } else {
            echo json_encode(['error' => 'Error: ' . $stmt->error]);
        }
        $stmt->close();
    } else {
        echo json_encode(['error' => 'Error: ' . $conn->error]);
    }
}

$method = $_SERVER['REQUEST_METHOD'];
$action = $_GET['action'] ?? null;
$id = $_GET['user_id'] ?? null;

$name = $_GET['name'] ?? '';
$password = $_GET['password'] ?? '';
$address = $_GET['address'] ?? '';
$user_role = $_GET['user_role'] ?? '';
$email = $_GET['email'] ?? '';

$routes = [
    'GET' => [
        'get-all-users' => fn() => getAllUsers($conn),
        'get-user-by-id' => fn() => getUserById($conn, $id),
        'create-user' => fn() => createUser($conn, $name, $password, $address, $user_role, $email),
    ],
    'DELETE' => [
        'delete-user' => fn() => deleteUser($conn, $id),
    ]
];

if ($method === 'GET' && isset($routes['GET'][$action])) {
    $response = $routes['GET'][$action]();
    header('Content-Type: application/json');
    echo json_encode($response);
} elseif ($method === 'DELETE' && isset($routes['DELETE'][$action])) {
    $response = $routes['DELETE'][$action]();
    header('Content-Type: application/json');
    echo json_encode($response);
} else {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid request']);
}
