<?php

include '../connection.php';
include '../headers.php';
include '../helper.php';

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Todo: finish crud

function createCourse(){
    createData('course',['teacher_id','course_name','category','price']);
}

function listCourses(){
    getFromTable('course');
}

function getCourse(){
    getTableById('course','course_id');
}

function deleteCourse(){
    deleteById('course','course_id');
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
