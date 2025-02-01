<?php
    include_once 'headers.php';
    include_once 'message_response.php';

    $db_server = "localhost";
    $db_user = "root";
    $db_pass = "";
    $db_name = "bini_academy_db";

    $conn = mysqli_connect($db_server, $db_user, $db_pass, $db_name);

    if ($conn->connect_error) {
        die(errorMessage("Connection failed: " . $conn->connect_error));
    }
?>
