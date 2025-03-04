<?php

include '../headers.php';
include '../connection.php';
include '../helper.php';

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

function getEvent(){
    getFromTable('event');
}

function createEvent(){
    createData('event',['event_host','event_name','event_type','event_date']);
}

function updateEvent(){
    updateData('event','event_id',['event_host','event_name','event_type','event_date']);
}

function deleteEvent(){
    deleteById('event','event_id');
}

$method = $_SERVER['REQUEST_METHOD'];
$action = $_GET['action'] ?? null;

// Define allowed actions as a dictionary
$routes = [
    'GET' => [
        
    ],
    'POST' => [
        'get-event' => 'getEvent',
        'create-event' => 'createEvent',
        'update-event' => 'updateEvent',
    ],
    'DELETE' => [
        'delete-event' => 'deleteEvent',
    ],
];

// Check if the method exists and contains the action
if (isset($routes[$method][$action])) {
    call_user_func($routes[$method][$action]);
} else {
    sendError(400, 'Invalid request method or action');
}

