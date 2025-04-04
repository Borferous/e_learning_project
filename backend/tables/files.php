<?php
include '../headers.php';
include '../connection.php';
include '../helper.php';

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: POST, GET, OPTIONS, DELETE');
    header('Access-Control-Allow-Headers: Content-Type');
    http_response_code(200);
    exit;
}


function handleFileList()
{
    global $conn;
    header('Content-Type: application/json');
    $result = $conn->query("SELECT file_id, file_name, file_path FROM files");

    if (!$result) {
        echo json_encode(["error" => "Database error: " . $conn->error]);
        exit;
    }

    $files = [];
    while ($row = $result->fetch_assoc()) {
        $files[] = $row;
    }

    // ✅ Always return an array, even if empty
    echo json_encode($files);
    exit;
}

function handleFileUpload()
{
    global $conn;

    header('Content-Type: application/json');

    if (!isset($_FILES['fileToUpload'])) {
        echo json_encode(["error" => "No file uploaded."]);
        return;
    }

    $file = $_FILES['fileToUpload'];
    $fileName = basename($file['name']);
    $fileTmpName = $file['tmp_name'];
    $fileError = $file['error'];
    $fileType = mime_content_type($fileTmpName); // Get actual MIME type

    $allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];

    if ($fileError !== 0) {
        echo json_encode(["error" => "Error uploading the file."]);
        return;
    }

    if (!in_array($fileType, $allowedTypes)) {
        echo json_encode(["error" => "Invalid file type."]);
        return;
    }

    // Ensure uploads folder exists
    $uploadDir = __DIR__ . '\\..\\uploads\\';
    if (!is_dir($uploadDir)) {
        mkdir($uploadDir, 0777, true);
    }

    // Generate a safe unique file name
    $fileExt = pathinfo($fileName, PATHINFO_EXTENSION);
    $fileNewName = uniqid('file_', true) . "." . $fileExt;
    $fileDestination = $uploadDir . $fileNewName;

    if (move_uploaded_file($fileTmpName, $fileDestination)) {
        $dbFilePath = 'uploads\\' . $fileNewName; // Store relative path in the database

        // Insert only file_name and file_path into the database
        $stmt = $conn->prepare("INSERT INTO files (file_name, file_path) VALUES (?, ?)");
        $stmt->bind_param("ss", $fileName, $dbFilePath);

        if ($stmt->execute()) {
            echo json_encode(["message" => "File uploaded successfully.", "file_path" => $dbFilePath]);
        } else {
            echo json_encode(["error" => "Error storing file data in the database."]);
        }

        $stmt->close();
    } else {
        echo json_encode(["error" => "Failed to move uploaded file."]);
    }
}

// Function to handle file deletion (DELETE /files?action=delete)
function handleFileDelete()
{
    global $conn;

    // Get the file ID from the query string (e.g., /files?action=delete&file_id=123)
    $fileId = $_GET['file_id'] ?? null;

    if ($fileId === null) {
        echo json_encode(["error" => "File ID is required."]);
        return;
    }

    // Fetch file details from the database
    $stmt = $conn->prepare("SELECT file_path FROM files WHERE file_id = ?");
    $stmt->bind_param("i", $fileId);
    $stmt->execute();
    $result = $stmt->get_result();
    $file = $result->fetch_assoc();

    if ($file) {
        // Ensure the full file path is correct by prepending the server's root directory
        $uploadDir = dirname(__DIR__) . '\\'; // Full path to the 'uploads' directory
        $fullFilePath = $uploadDir . $file['file_path']; 

        // Delete the file from the server
        if (unlink($fullFilePath)) {
            // Delete the file record from the database
            $stmt = $conn->prepare("DELETE FROM files WHERE file_id = ?");
            $stmt->bind_param("i", $fileId);
            if ($stmt->execute()) {
                echo json_encode(["message" => "File deleted successfully."]);
            } else {
                echo json_encode(["error" => "Error deleting file from database."]);
            }
        } else {
            echo json_encode(["error" => "Failed to delete the file from the server."]);
        }
    } else {
        echo json_encode(["error" => "File not found."]);
    }

    $stmt->close();
}

function handleDeleteAll()
{
    global $conn;

    // Fetch all file paths from the database
    $stmt = $conn->prepare("SELECT file_path FROM files");
    $stmt->execute();
    $result = $stmt->get_result();

    // Collect file paths to delete
    $filesToDelete = [];
    while ($file = $result->fetch_assoc()) {
        $filesToDelete[] = $file['file_path'];
    }

    // Check if there are files to delete
    if (empty($filesToDelete)) {
        echo json_encode(["message" => "No files to delete."]);
        return;
    }

    // Ensure the full file path is correct by prepending the server's root directory
    $uploadDir = dirname(__DIR__) . '\\';

    // Delete files from the server
    $allDeleted = true;
    foreach ($filesToDelete as $filePath) {
        $fullFilePath = $uploadDir . $filePath; // Full path to each file
        if (!unlink($fullFilePath)) {
            $allDeleted = false;
        }
    }

    // If all files were deleted, remove the records from the database
    if ($allDeleted) {
        $stmt = $conn->prepare("DELETE FROM files");
        if ($stmt->execute()) {
            echo json_encode(["message" => "All files deleted successfully."]);
        } else {
            echo json_encode(["error" => "Error deleting file records from the database."]);
        }
    } else {
        echo json_encode(["error" => "Some files could not be deleted from the server."]);
    }

    $stmt->close();
}





$method = $_SERVER['REQUEST_METHOD'];
$action = $_GET['action'] ?? null;

// Define allowed actions as a dictionary
$routes = [
    'GET' => [
        'list' => 'handleFileList', // Action to handle file listing
    ],
    'POST' => [
        'upload' => 'handleFileUpload', // Action to handle file uploads
    ],
    'DELETE' => [
        'delete' => 'handleFileDelete', // Action to handle file deletion
        'delete-all' => 'handleDeleteAll', // Action to handle deleting all files
    ],
];

// Check if the method exists and contains the action
if (isset($routes[$method][$action])) {
    call_user_func($routes[$method][$action]);
} else {
    sendError(400, 'Invalid request method or action');
}

