<?php
    include_once '../headers.php';
    include_once '../message_response.php';
    include_once '../connection.php';

    switch ($_SERVER['REQUEST_METHOD']) {
        case 'GET':
            $query = "SELECT * FROM users";
            $result = mysqli_query($conn, $query);

            if (!$result) {
                echo errorMessage("Database query failed: " . mysqli_error($conn));
                break;
            }

            $users = mysqli_fetch_all($result, MYSQLI_ASSOC);

            if (count($users) > 0) {
                echo successMessage('Get users success', $users);
            } else {
                echo errorMessage('No users found.');
            }
            break;

        case 'POST':
            echo successMessage('User creation functionality goes here');
            break;

        default:
            echo errorMessage('Unsupported request method.');
            break;
    }

    include_once '../close_connection.php';
?>
