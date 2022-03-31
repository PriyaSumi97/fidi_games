-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 31, 2022 at 09:28 AM
-- Server version: 10.4.22-MariaDB
-- PHP Version: 8.0.13

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `fidi_games`
--

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `cu_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `up_date` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`id`, `name`, `cu_date`, `up_date`) VALUES
(1, 'adventure', '2022-03-24 17:22:19', '2022-03-25 09:51:34'),
(2, 'shooting', '2022-03-25 09:52:28', '2022-03-25 09:52:28'),
(3, 'fighting', '2022-03-25 10:53:17', '2022-03-25 11:59:57'),
(4, 'puzzle', '2022-03-27 11:44:44', '2022-03-27 11:53:43'),
(5, 'sports', '2022-03-27 11:45:07', '2022-03-30 07:20:21');

-- --------------------------------------------------------

--
-- Table structure for table `games`
--

CREATE TABLE `games` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `description` varchar(100) NOT NULL,
  `game_url` varchar(150) NOT NULL,
  `min_players_count` int(11) DEFAULT NULL,
  `max_players_count` int(11) DEFAULT NULL,
  `category` int(11) NOT NULL,
  `image` varchar(100) NOT NULL,
  `cu_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `up_date` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `games`
--

INSERT INTO `games` (`id`, `name`, `description`, `game_url`, `min_players_count`, `max_players_count`, `category`, `image`, `cu_date`, `up_date`) VALUES
(1, 'Sniper 3D', 'Fight in a multiplayer arena and guild war to become the best sniper assassin in this fun multiplaye', 'www.sniper3d.com', 2, 10, 2, 'image_1648703875511.jpg', '2022-03-31 04:47:12', '2022-03-31 05:17:55'),
(2, 'Basket Champs', 'Pick your favorite team and compete in the tournament by scoring more points than your opponents.', 'www.Basketchamps.com', 2, 14, 5, 'image_1648702416404.jpg', '2022-03-31 04:53:36', '2022-03-31 05:19:46'),
(3, 'Braingle', 'Braingle is the quiz app for smart people. Get an answer right, you\'ll move up a level.', 'www.Bringle.com', 1, 10, 4, 'image_1648702822690.jpg', '2022-03-31 05:00:22', '2022-03-31 05:22:34'),
(4, 'War of Angels', 'Discover this detailed fantasy world with its unique anime style.', 'www.Warofangels.com', 2, 50, 1, 'image_1648703077023.jpg', '2022-03-31 05:04:37', '2022-03-31 05:23:32'),
(5, 'Giant Rush', 'Avoid obstacles and differently colored elements, as they will reduce your strength', 'www.giantrush.com', 2, 50, 3, 'image_1648703487923.webp', '2022-03-31 05:11:27', '2022-03-31 05:24:57'),
(37, 'sudokku', 'Fight in a multiplayer arena and guild war to become the best sniper assassin in this fun multiplaye', 'www.sniper3d.com', 2, 10, 2, 'image_1648707864670.jpg', '2022-03-31 06:23:15', '2022-03-31 06:24:24');

-- --------------------------------------------------------

--
-- Table structure for table `likes`
--

CREATE TABLE `likes` (
  `id` int(11) NOT NULL,
  `game_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `likes`
--

INSERT INTO `likes` (`id`, `game_id`, `user_id`) VALUES
(1, 2, 1),
(2, 2, 4),
(3, 5, 2),
(4, 4, 5),
(5, 3, 4);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(200) NOT NULL,
  `address` varchar(200) NOT NULL,
  `cu_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `up_date` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password`, `address`, `cu_date`, `up_date`) VALUES
(1, 'Priya', 'priyaya@gmail.com', '$2b$10$VW1kYC9tzM4v6qIevfGuu.RWxf6ANedOBtuHQEGJdoPdirLrhyAEm', 'tiruchengode', '2022-03-27 13:32:12', '2022-03-31 05:26:27'),
(2, 'Kanaka', 'kanaka@gmail.com', '$2b$10$LQQIE16.aew40J7sWzUqpuujPpg00HkWyQVfmpVDha4AhbKeD1wq.', 'tiruchengode', '2022-03-27 13:32:12', '2022-03-31 05:26:55'),
(3, 'Ramya', 'ramya@gmail.com', '$2b$10$.uJAviWo1DkOiJJ.JJVla.OQUKp0sxRJXQcXJtt7qNtXtLPyJUNeG', 'erode', '2022-03-27 13:32:54', '2022-03-31 05:25:46'),
(4, 'John', 'john@gmail.com', '$2b$10$t.gqaaHwvTJvn/CxaD1tyOVxTwBaAKHMW1Qgn3Q7ljbCWeqcdPXCq', 'bhavani', '2022-03-27 16:55:45', '2022-03-31 05:27:33'),
(5, 'Dinesh', 'dinesh@gmail.com', '$2b$10$Ve0qSIstwhP.TwppXwa9qOcUVGmXGmXz4QQ1ThjvCLappdurINOzS', 'salem', '2022-03-28 16:34:04', '2022-03-31 05:28:08');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `games`
--
ALTER TABLE `games`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `likes`
--
ALTER TABLE `likes`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `games`
--
ALTER TABLE `games`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- AUTO_INCREMENT for table `likes`
--
ALTER TABLE `likes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
