<?php

function sendError($code, $message) {
    header('Content-Type: application/json');
    http_response_code($code);
    exit(json_encode(['error' => $message]));
}

function getFromTable($table) {
    global $conn;
    $query = "SELECT * FROM $table";
    $result = mysqli_query($conn, $query);
    $values = [];
    while ($row = mysqli_fetch_assoc($result)) {
        $values[] = $row;
    }
    echo json_encode($values);
    exit;
}

function getTableById($table,$pk_name){
    global $conn;
    $data = json_decode(file_get_contents("php://input"), true);
    $id = $data[$pk_name] ?? null;
    if (!$id) {
        sendError(422,"Missing Id");
    }
    $query = "SELECT * FROM $table WHERE $pk_name = ?";
    $stmt = mysqli_prepare($conn, $query);
    mysqli_stmt_bind_param($stmt, 'i', $id);
    mysqli_stmt_execute($stmt);
    $result = mysqli_stmt_get_result($stmt);
    $output = mysqli_fetch_assoc($result) ?: [];
    echo json_encode($output);
    exit();
}

function deleteById($table,$pk_name){
    global $conn;
    $data = json_decode(file_get_contents("php://input"), true) ?? $_POST;
    $id = $data[$pk_name] ?? null;
    if (!$id) {
        sendError(422, 'Missing id');
    }
    $query = "DELETE FROM $table WHERE $pk_name = ?";
    if ($stmt = $conn->prepare($query)) {
        $stmt->bind_param("i", $id);
        if ($stmt->execute()) {
            echo json_encode(['message' => 'Data deleted successfully!']);
        } else {
            sendError(500, 'Error: ' . $stmt->error);
        }
        $stmt->close();
    } else {
        sendError(500, 'Error: ' . $conn->error);
    }
    exit();
}

function getInput(){
    return json_decode(file_get_contents("php://input"), true);
}

function updateData($table, $pk_name, $columns) {
    global $conn;
    $data = json_decode(file_get_contents("php://input"), true);

    $pk_value = $data[$pk_name] ?? null;
    if (!$pk_value) {
        sendError(422, 'Missing primary key value');
    }

    // Validate all required columns - none should be empty or missing
    foreach ($columns as $column) {
        if (!isset($data[$column]) || trim($data[$column]) === "") {
            sendError(422, "Missing or empty required field: $column");
        }
    }

    // Prepare update query
    $set_parts = [];
    $values = [];
    foreach ($columns as $column) {
        $set_parts[] = "$column = ?";
        $values[] = trim($data[$column]); // Ensure clean input
    }

    // Build query
    $query = "UPDATE $table SET " . implode(', ', $set_parts) . " WHERE $pk_name = ?";
    $values[] = $pk_value; // Add primary key at the end

    // Prepare and execute
    if ($stmt = $conn->prepare($query)) {
        $stmt->bind_param(str_repeat("s", count($values) - 1) . "i", ...$values);
        if ($stmt->execute()) {
            echo json_encode(['message' => 'Update successful!']);
        } else {
            sendError(500, 'Database error: ' . $stmt->error);
        }
        $stmt->close();
    } else {
        sendError(500, 'Database error: ' . $conn->error);
    }
    exit();
}

function createData($table, $columns) {
    global $conn;

    // Ensure $columns is an array
    if (!is_array($columns)) {
        sendError(400, "Columns parameter must be an array.");
    }

    // Decode JSON input safely
    $data = json_decode(file_get_contents("php://input"), true) ?? $_POST;

    if (!is_array($data)) {
        sendError(400, "Invalid input format.");
    }

    // Validate all required fields
    $values = [];
    $filteredData = [];
    foreach ($columns as $column) {
        if (!isset($data[$column]) || trim($data[$column]) === "") {
            sendError(422, "Missing or empty required field: $column");
        }
        $filteredData[$column] = trim($data[$column]); // Store validated data
        $values[] = $filteredData[$column];
    }

    // Build placeholders (?, ?, ?)
    $placeholders = implode(', ', array_fill(0, count($columns), '?'));

    // Construct the query
    $query = "INSERT INTO $table (" . implode(', ', $columns) . ") VALUES ($placeholders)";

    // Prepare statement
    if ($stmt = $conn->prepare($query)) {
        $stmt->bind_param(str_repeat('s', count($values)), ...$values);

        if ($stmt->execute()) {
            $filteredData['id'] = $stmt->insert_id; // Add the inserted ID to the response
            echo json_encode([
                'message' => 'Record created successfully!',
                'data' => $filteredData
            ]);
        } else {
            sendError(500, 'Database error: ' . $stmt->error);
        }
        $stmt->close();
    } else {
        sendError(500, 'Database error: ' . $conn->error);
    }
    exit();
}


function getFromTableWhere($table, $whereCondition) {
    global $conn;
    
    // Ensure $whereCondition is an array
    if (!is_array($whereCondition) || empty($whereCondition)) {
        sendError(400, "Invalid or missing whereCondition.");
    }

    $conditions = [];
    $values = [];
    $types = '';

    // Construct WHERE clause
    foreach ($whereCondition as $column => $value) {
        $conditions[] = "$column = ?";
        $values[] = $value;
        $types .= 's'; // Assuming all values are strings; adjust as needed
    }

    $query = "SELECT * FROM $table WHERE " . implode(' AND ', $conditions);
    
    if ($stmt = $conn->prepare($query)) {
        $stmt->bind_param($types, ...$values);
        $stmt->execute();
        $result = $stmt->get_result();

        $data = [];
        while ($row = $result->fetch_assoc()) {
            $data[] = $row;
        }

        echo json_encode($data);
        exit();
    } else {
        sendError(500, 'Database error: ' . $conn->error);
    }
}

function deleteAllFromTable($table) {
    global $conn;
    
    $query = "DELETE FROM $table";
    if ($stmt = $conn->prepare($query)) {
        if ($stmt->execute()) {
            echo json_encode(['message' => 'All records deleted successfully!']);
        } else {
            sendError(500, 'Database error: ' . $stmt->error);
        }
        $stmt->close();
    } else {
        sendError(500, 'Database error: ' . $conn->error);
    }
    
}
