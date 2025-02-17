<?php

include '../connection.php';
include '../headers.php';
include '../helper.php';

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

$method = $_SERVER['REQUEST_METHOD'];
$action = $_GET['action'] ?? null;

// Todo: finish crud

function createCourse(){
    
}

function listCourses(){
    getFromTable('course');
}

function getCourse(){
    getTableById('course','course_id');
}

switch ($method) {
    case 'POST':

        switch ($action) {
            case 'create-course':
                createCourse();
                break;
            case 'get-course':
                getCourse();
                break;
            default:
                sendError(400, 'Invalid Action');
                break;
        }

        break;
    case 'GET':

        switch ($action) {
            case 'list-courses':
                listCourses();
                break;
            default:
                sendError(400,"Invalid Action");
                break;
        }

        break;

    case 'DELETE':

        break;

    default:
        sendError(400, 'Invalid Action');
        break;
}
