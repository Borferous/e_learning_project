-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 04, 2025 at 03:00 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `bini_academy_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `course`
--

CREATE TABLE `course` (
  `course_id` int(11) NOT NULL,
  `teacher_id` int(11) DEFAULT NULL,
  `course_title` varchar(255) NOT NULL,
  `program_category` varchar(50) NOT NULL,
  `price` int(11) NOT NULL,
  `description` varchar(255) NOT NULL,
  `course_level` varchar(25) NOT NULL DEFAULT 'beginner',
  `course_topic` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `course`
--

INSERT INTO `course` (`course_id`, `teacher_id`, `course_title`, `program_category`, `price`, `description`, `course_level`, `course_topic`) VALUES
(1, 2, 'Bachelor\'s Degree in Fine Arts', 'bachelor', 10000, 'A Bachelor of Fine Arts (BFA) in Visual Arts is a four-year degree that focuses on developing artistic skills and creativity across various mediums, including painting, sculpture, digital art, and mixed media.', 'beginner', 'visual arts'),
(2, 2, 'Songwriting & Music Composition', 'workshop', 20000, 'A workshop exploring melody, harmony, and lyric writing. Participants will create original compositions and learn industry tips for songwriting success.', 'intermediate', 'music'),
(3, 3, 'Diploma in Dance Performance & Choreography', 'diploma', 30000, 'A program that trains dancers in technique, performance, and choreography. Prepares students for careers in dance companies, teaching, or choreography.\r\n\r\n', 'advanced', 'dancing'),
(17, 2, 'asdasd', 'bachelor', 999, 'zxczxc', 'beginner', 'aasdasd');

-- --------------------------------------------------------

--
-- Table structure for table `event`
--

CREATE TABLE `event` (
  `event_id` int(11) NOT NULL,
  `event_host` int(25) NOT NULL,
  `event_title` varchar(255) NOT NULL,
  `event_category` varchar(255) NOT NULL,
  `event_start_date` varchar(25) NOT NULL,
  `event_description` varchar(255) NOT NULL,
  `event_end_date` varchar(25) NOT NULL,
  `event_subtitle` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `event`
--

INSERT INTO `event` (`event_id`, `event_host`, `event_title`, `event_category`, `event_start_date`, `event_description`, `event_end_date`, `event_subtitle`) VALUES
(29, 3, 'Art Competition', 'visual arts', '2025-03-01', 'its a competition but art', '', 'A competition where you draw things'),
(30, 2, 'Tiktok Dance competition', 'dance', '2025-03-30', 'a competition but dance and also tiktok', '2025-03-31', 'tiktokening');

-- --------------------------------------------------------

--
-- Table structure for table `files`
--

CREATE TABLE `files` (
  `file_id` int(11) NOT NULL,
  `file_name` varchar(255) NOT NULL,
  `file_path` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `name` varchar(25) NOT NULL,
  `password` varchar(11) NOT NULL,
  `address` varchar(255) NOT NULL,
  `user_role` varchar(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `profile_picture` blob DEFAULT NULL,
  `status` varchar(10) NOT NULL DEFAULT 'active'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `name`, `password`, `address`, `user_role`, `email`, `profile_picture`, `status`) VALUES
(1, 'Yuichi Student', 'password123', 'address123', 'student', 'student@gmail.com', NULL, 'active'),
(2, 'Ellis Teacher', 'password123', 'address123', 'teacher', 'teacher@gmail.com', NULL, 'active'),
(3, 'Cister Admin', 'password123', 'address123', 'admin', 'admin@gmail.com', NULL, 'active'),
(37, 'Another user', 'password123', 'address123', 'student', 'ycanete_220000000743@gmail.com', NULL, 'active'),
(38, 'Another user', 'password123', 'address123', 'student', 'ycanete_220000000743@gmail.com', NULL, 'active'),
(39, 'wtf', 'wtf', 'myaddress123', 'student', 'wtf', NULL, 'active');

-- --------------------------------------------------------

--
-- Table structure for table `user_course`
--

CREATE TABLE `user_course` (
  `user_course_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `course_id` int(11) NOT NULL,
  `certificate_status` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user_event`
--

CREATE TABLE `user_event` (
  `user_event_id` int(11) NOT NULL,
  `event_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `role` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `course`
--
ALTER TABLE `course`
  ADD PRIMARY KEY (`course_id`),
  ADD KEY `teacher_user` (`teacher_id`);

--
-- Indexes for table `event`
--
ALTER TABLE `event`
  ADD PRIMARY KEY (`event_id`),
  ADD KEY `event_host` (`event_host`);

--
-- Indexes for table `files`
--
ALTER TABLE `files`
  ADD PRIMARY KEY (`file_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`);

--
-- Indexes for table `user_course`
--
ALTER TABLE `user_course`
  ADD PRIMARY KEY (`user_course_id`),
  ADD KEY `user_course_fk` (`user_id`),
  ADD KEY `course_user_fk` (`course_id`);

--
-- Indexes for table `user_event`
--
ALTER TABLE `user_event`
  ADD PRIMARY KEY (`user_event_id`),
  ADD KEY `event_id` (`event_id`),
  ADD KEY `user_id` (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `course`
--
ALTER TABLE `course`
  MODIFY `course_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `event`
--
ALTER TABLE `event`
  MODIFY `event_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `files`
--
ALTER TABLE `files`
  MODIFY `file_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;

--
-- AUTO_INCREMENT for table `user_course`
--
ALTER TABLE `user_course`
  MODIFY `user_course_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `user_event`
--
ALTER TABLE `user_event`
  MODIFY `user_event_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `course`
--
ALTER TABLE `course`
  ADD CONSTRAINT `teacher_user` FOREIGN KEY (`teacher_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE;

--
-- Constraints for table `event`
--
ALTER TABLE `event`
  ADD CONSTRAINT `event_host` FOREIGN KEY (`event_host`) REFERENCES `users` (`user_id`) ON DELETE CASCADE;

--
-- Constraints for table `user_course`
--
ALTER TABLE `user_course`
  ADD CONSTRAINT `course_user_fk` FOREIGN KEY (`course_id`) REFERENCES `course` (`course_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `user_course_fk` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE;

--
-- Constraints for table `user_event`
--
ALTER TABLE `user_event`
  ADD CONSTRAINT `event_id` FOREIGN KEY (`event_id`) REFERENCES `event` (`event_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
