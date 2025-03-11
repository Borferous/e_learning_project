<?php

include './headers.php';
include './helper.php';
include './connection.php';

$tables = [
    'user_course',
    'users',
    'event',
    'course'
];

global $conn;

// Delete all records from specified tables
foreach ($tables as $table) {
    $query = "DELETE FROM $table";
    if ($stmt = $conn->prepare($query)) {
        if (!$stmt->execute()) {
            sendError(500, 'Database error: ' . $stmt->error);
        }
        $stmt->close();
    } else {
        sendError(500, 'Database error: ' . $conn->error);
    }
}

// Reinsert default users
$usersQuery = "INSERT INTO `users` (`user_id`, `name`, `password`, `address`, `user_role`, `email`, `profile_picture`, `status`) 
VALUES 
    (1, 'Yuichi Student', 'password123', 'address123', 'student', 'student@gmail.com', NULL, 'active'), 
    (2, 'Ellis Teacher', 'password123', 'address123', 'teacher', 'teacher@gmail.com', NULL, 'active'), 
    (3, 'Cister Admin', 'password123', 'address123', 'admin', 'admin@gmail.com', NULL, 'active');";

if (!$conn->query($usersQuery)) {
    sendError(500, 'Database error: ' . $conn->error);
}

$courseQuery = "INSERT INTO `course` (`course_id`, `teacher_id`, `course_title`, `program_category`, `price`, `description`, `course_level`, `course_topic`) VALUES ('1', '2', 'Bachelor\'s Degree in Fine Arts', 'bachelor', '10000', 'A Bachelor of Fine Arts (BFA) in Visual Arts is a four-year degree that focuses on developing artistic skills and creativity across various mediums, including painting, sculpture, digital art, and mixed media.', 'beginner', 'visual arts'), ('2', '2', 'Songwriting & Music Composition', 'workshop', '20000', 'A workshop exploring melody, harmony, and lyric writing. Participants will create original compositions and learn industry tips for songwriting success.', 'intermediate', 'music'), ('3', '3', 'Diploma in Dance Performance & Choreography', 'diploma', '30000', 'A program that trains dancers in technique, performance, and choreography. Prepares students for careers in dance companies, teaching, or choreography.\r\n\r\n', 'advanced', 'dancing');";

if (!$conn->query($courseQuery)) {
    sendError(500, 'Database error: ' . $conn->error);
}

exit(json_encode([
    'message' => 'Database reset successful',
]));
