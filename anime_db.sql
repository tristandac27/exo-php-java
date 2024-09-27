-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : ven. 27 sep. 2024 à 10:14
-- Version du serveur : 10.4.32-MariaDB
-- Version de PHP : 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `anime_db`
--

-- --------------------------------------------------------

--
-- Structure de la table `animes`
--

CREATE TABLE `animes` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `year` int(11) DEFAULT NULL,
  `season` varchar(255) DEFAULT NULL,
  `synopsis` text DEFAULT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `animes`
--

INSERT INTO `animes` (`id`, `name`, `year`, `season`, `synopsis`, `user_id`) VALUES
(23, 'Balala Xiao Mo Xian: Caihong Xin Shi', 2011, 'spring', 'After the fairies defeated Gunala, the Evil Goddess, another crisis hit the Fairy Castle!! The magical energy of the world has been devoured by the evil wizards. The Rainbow Flower, the source of the magic power, is soon to wither, and this will destroy the world of Fairy Castle. Only finding the legendary Rainbow Heart Stone and letting it recollect all the essential energy can save the world. To solve this biggest crisis in the history of the Fairy Castle, Prince YouLe, Sally, and their new friend XiaoQian, have to go back to the human world and reunite with Maggie and Michelle to fight the evil again.\n\n(Source: Mahou Shoujo Wikia, edited)', 1),
(24, 'Balala Xiao Mo Xian: Qiji Wubu', 2013, 'spring', 'The kingdom of Gemini is attacked by the evil Queen Halle. The twin princesses of the kingdom are missing, so is the important Night Star Box, which has affected planets including Earth. The fairy Queen had sent Prince You Le and Sally to Earth, looking for the Night Star Box with the help of Maggie and Michelle. Then the gang found out one of the girls who takes dance lessons with Maggie and Michelle is one of the missing princesses, Bei Bei! The mission to find the Night Star Box and the the still missing princess, Ya Ya, is now on the shoulder of the fairies.\n\n(Source: Mahou Shoujo Wikia, edited)', 1),
(25, 'Kuroko no Basket Movie 4: Last Game', 2017, 'N/A', 'Hailing from America, Jabberwock—a street basketball team with skills comparable to those of the NBA—has come to Japan to play an exhibition match against Strky, a team of former third-year students who once played in the Interhigh and Winter Cup. However, due to the vast difference in skill, Jabberwock easily wins. Their captain, Nash Gold Jr., mocks the basketball style of all players in Japan by comparing them to monkeys.\n \nInfuriated by the nasty comment, Kagetora Aida challenges them to a revenge match. Because of pride and the belief that the results will be no different, Nash accepts the challenge. Kagetora then assembles Vorpal Swords, a team composed of the Generation of Miracles, including Kuroko Tetsuya and Kagami Taiga, for they are the only ones who stand a chance against a foe that seems unbeatable from every angle.\n\n[Written by MAL Rewrite]', 1);

-- --------------------------------------------------------

--
-- Structure de la table `messages`
--

CREATE TABLE `messages` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `message` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(100) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `email`, `created_at`) VALUES
(1, 'tristan', '$2y$10$mDOmblcTYu/vLlW5eVNpHOKKiiSydPR0ETFFJ9eJ65tT/D/3hQOFS', 'tristandac@gmail.com', '2024-09-25 12:12:32'),
(2, 'test', '$2y$10$1PkuyJ5TBIB1wpBTCXraDuLKm38ImKu6mcDPN8b.9btacoXk08vpi', 'test@test.fr', '2024-09-25 12:16:37');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `animes`
--
ALTER TABLE `animes`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Index pour la table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `animes`
--
ALTER TABLE `animes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT pour la table `messages`
--
ALTER TABLE `messages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;

--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `messages`
--
ALTER TABLE `messages`
  ADD CONSTRAINT `messages_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

DELIMITER $$
--
-- Évènements
--
CREATE DEFINER=`root`@`localhost` EVENT `delete_chat_messages` ON SCHEDULE EVERY 10 MINUTE STARTS '2024-09-25 14:59:34' ON COMPLETION NOT PRESERVE ENABLE DO DELETE FROM messages$$

DELIMITER ;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
