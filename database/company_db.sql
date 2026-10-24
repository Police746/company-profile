-- ============================================================================
-- DATABASE: company_db
-- Company Profile Pribadi & Admin Suite (User, Role, Menu & Submenu Management)
-- Author: Syauqi Abduraffi (Teknik Informatika)
-- Compatible with: MySQL 8.x / MariaDB 10.x / phpMyAdmin
-- ============================================================================

CREATE DATABASE IF NOT EXISTS `company_db`
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE `company_db`;

DROP TABLE IF EXISTS `user_access_menu`;
DROP TABLE IF EXISTS `user_sub_menu`;
DROP TABLE IF EXISTS `user`;
DROP TABLE IF EXISTS `user_menu`;
DROP TABLE IF EXISTS `user_role`;

-- ============================================================================
-- 1. TABEL: user_role
-- Kolom: id, role (Hanya Admin dan User sesuai permintaan)
-- ============================================================================
CREATE TABLE `user_role` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `role` VARCHAR(128) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `user_role` (`id`, `role`) VALUES
(1, 'Admin'),
(2, 'User');

-- ============================================================================
-- 2. TABEL: user
-- Kolom: id, username, email, phone, image, password, role_id, is_active, date_create
-- ============================================================================
CREATE TABLE `user` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(128) NOT NULL,
  `email` VARCHAR(128) NOT NULL UNIQUE,
  `phone` VARCHAR(30) NOT NULL,
  `image` VARCHAR(255) NOT NULL DEFAULT 'default.webp',
  `password` VARCHAR(256) NOT NULL,
  `role_id` INT(11) NOT NULL,
  `is_active` INT(1) NOT NULL DEFAULT 1,
  `date_create` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_user_role` (`role_id`),
  CONSTRAINT `fk_user_role` FOREIGN KEY (`role_id`) REFERENCES `user_role` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `user` (`id`, `username`, `email`, `phone`, `image`, `password`, `role_id`, `is_active`, `date_create`) VALUES
(1, 'syauqi_admin', 'syauqi.informatika@devmail.id', '+62 812-8899-7766', 'https://bootstrapmade.com/content/demo/AppDashboard/assets/img/profile-img.webp', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 1, 1, '2026-01-15 08:30:00'),
(2, 'user_perpustakaan', 'user.simpus@kampus.ac.id', '+62 813-7744-5522', 'https://bootstrapmade.com/content/demo/AppDashboard/assets/img/avatar-1.webp', '$2y$10$e0MYzXyjpJS7Pd0RVvHwHeFUP/8r5bA1nO9qB2fG4tV7wX9zK1mC2', 2, 1, '2026-02-10 10:15:00');

-- ============================================================================
-- 3. TABEL: user_menu
-- Kolom: id, menu (Admin, User, Menu sesuai gambar)
-- ============================================================================
CREATE TABLE `user_menu` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `menu` VARCHAR(128) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `user_menu` (`id`, `menu`) VALUES
(1, 'Admin'),
(2, 'User'),
(3, 'Menu');

-- ============================================================================
-- 4. TABEL: user_access_menu
-- Kolom: id, role_id, menu_id
-- ============================================================================
CREATE TABLE `user_access_menu` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `role_id` INT(11) NOT NULL,
  `menu_id` INT(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_access_role` (`role_id`),
  KEY `fk_access_menu` (`menu_id`),
  CONSTRAINT `fk_access_role` FOREIGN KEY (`role_id`) REFERENCES `user_role` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_access_menu` FOREIGN KEY (`menu_id`) REFERENCES `user_menu` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `user_access_menu` (`id`, `role_id`, `menu_id`) VALUES
(1, 1, 1),
(2, 1, 2),
(3, 1, 3),
(4, 2, 2);

-- ============================================================================
-- 5. TABEL: user_sub_menu
-- Kolom: id, menu_id, title, url, icon, is_active
-- ============================================================================
CREATE TABLE `user_sub_menu` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `menu_id` INT(11) NOT NULL,
  `title` VARCHAR(128) NOT NULL,
  `url` VARCHAR(128) NOT NULL,
  `icon` VARCHAR(128) NOT NULL,
  `is_active` INT(1) NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`),
  KEY `fk_submenu_menu` (`menu_id`),
  CONSTRAINT `fk_submenu_menu` FOREIGN KEY (`menu_id`) REFERENCES `user_menu` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `user_sub_menu` (`id`, `menu_id`, `title`, `url`, `icon`, `is_active`) VALUES
(1, 1, 'Dashboard', 'command-center', 'fas fa-fw fa-tachometer-alt', 1),
(2, 1, 'Role Management', 'db-user-role', 'fas fa-fw fa-user-tie', 1),
(3, 1, 'Manajemen Akun', 'db-user', 'fas fa-fw fa-users', 1),
(4, 2, 'My Profile', 'cms-settings', 'fas fa-fw fa-user', 1),
(5, 2, 'Skills Teknik Informatika', 'cms-skills', 'fas fa-fw fa-laptop-code', 1),
(6, 2, 'Portofolio & Web Perpustakaan', 'cms-portfolio', 'fas fa-fw fa-book-reader', 1),
(7, 3, 'Menu Management', 'db-user-menu', 'fas fa-fw fa-folder', 1),
(8, 3, 'Submenu Management', 'db-user-submenu', 'fas fa-fw fa-folder-open', 1);
