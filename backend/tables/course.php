<?php

include '../connection.php';
include '../headers.php';
include '../helper.php';

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

function createCourse(){
    createData('course',['teacher_id','course_name','category','price']);
}

function listCourses(){
    getFromTable('course');
}

function getCourse(){
    getTableById('course','course_id');
}

function getCourseCategory(){
    $data = getInput();
    $whereCon = ['category' => $data['category']];
    getFromTableWhere('course',$whereCon);
}

function deleteCourse(){
    deleteById('course','course_id');
}

function getCourseCount() {
    global $conn;

    $query = "SELECT category, COUNT(*) AS course_count FROM course GROUP BY category";
    $result = mysqli_query($conn, $query);

    if ($result) {
        $data = [];
        while ($row = mysqli_fetch_assoc($result)) {
            $data[] = $row;
        }
        echo json_encode($data);
    } else {
        sendError(500, 'Database error: ' . mysqli_error($conn));
    }
    exit();
}


$method = $_SERVER['REQUEST_METHOD'];
$action = $_GET['action'] ?? null;

// Define allowed actions as a dictionary
$routes = [
    'POST' => [
        'create-course' => 'createCourse',
        'get-course' => 'getCourse',
    ],
    'GET' => [
        'list-courses' => 'listCourses',
        'get-course-category' => 'getCourseCategory',
        'get-course-count' => 'getCourseCount'
    ],
    'DELETE' => [
        'delete-course' => 'deleteCourse'
    ], // Empty for now, but ready for future actions
];

// Check if the method exists and contains the action
if (isset($routes[$method][$action])) {
    call_user_func($routes[$method][$action]);
} else {
    sendError(400, 'Invalid request method or action');
}
