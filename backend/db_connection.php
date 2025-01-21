<!-- Detects if connected to backend server -->

<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

$db_server = "localhost";
$db_user = "root";
$db_pass = "";
$db_name = "bini_academy_db";

// Create a new connection
$conn = mysqli_connect($db_server, $db_user, $db_pass, $db_name);

// Check if the connection is successful
if ($conn->connect_error) {
    die(json_encode(["status" => "error", "message" => "Connection failed: " . $conn->connect_error]));
}

// You can also store the connection in a variable for later use if needed.
?>
