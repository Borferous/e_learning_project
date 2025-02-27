<?php

include '../connection.php';
include '../headers.php';
include '../helper.php';

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

function enrollUser() {
    global $conn;
    $data = json_decode(file_get_contents("php://input"), true) ?? $_POST;

    $user_id = $data['user_id'] ?? null;
    $course_id = $data['course_id'] ?? null;

    if (!$user_id || !$course_id) {
        sendError(422, "Missing or empty required field");
    }

    // Check if the user is already enrolled in the course
    $query = "SELECT * FROM user_course WHERE user_id = ? AND course_id = ?";
    if ($stmt = $conn->prepare($query)) {
        $stmt->bind_param("ii", $user_id, $course_id);
        $stmt->execute();
        $result = $stmt->get_result();
        if ($result->num_rows > 0) {
            sendError(409, "User is already enrolled in this course");
        }
        $stmt->close();
    } else {
        sendError(500, "Database error: " . $conn->error);
    }

    // Enroll the user in the course
    $query = "INSERT INTO user_course (user_id, course_id, certificate_status) VALUES (?, ?, 'Not Completed')";
    if ($stmt = $conn->prepare($query)) {
        $stmt->bind_param("ii", $user_id, $course_id);
        if ($stmt->execute()) {
            echo json_encode(["message" => "User enrolled successfully"]);
        } else {
            sendError(500, "Failed to enroll user: " . $stmt->error);
        }
        $stmt->close();
    } else {
        sendError(500, "Database error: " . $conn->error);
    }
}

function getUserCourses() {
    global $conn;
    $data = json_decode(file_get_contents("php://input"), true) ?? $_GET;

    $user_id = $data['user_id'] ?? null;

    if (!$user_id) {
        sendError(422, "Missing user_id");
    }

    $query = "SELECT c.course_id, c.course_name, c.category, c.price, c.description, uc.certificate_status
              FROM user_course uc
              JOIN course c ON uc.course_id = c.course_id
              WHERE uc.user_id = ?";

    if ($stmt = $conn->prepare($query)) {
        $stmt->bind_param("i", $user_id);
        $stmt->execute();
        $result = $stmt->get_result();
        $courses = [];

        while ($row = $result->fetch_assoc()) {
            $courses[] = $row;
        }

        $stmt->close();

        echo json_encode([
            "message" => "User courses retrieved successfully",
            "courses" => $courses
        ]);
        exit();
    } else {
        sendError(500, "Database error: " . $conn->error);
    }
}

$method = $_SERVER['REQUEST_METHOD'];
$action = $_GET['action'] ?? null;

$routes = [
    'POST' => [
        'enroll-user' => 'enrollUser',
    ],
    'GET' => [
        'get-user-courses' => 'getUserCourses'
    ],
    'DELETE' => [
      
    ],
];

if (isset($routes[$method][$action])) {
    call_user_func($routes[$method][$action]);
} else {
    sendError(400, 'Invalid request method or action');
}