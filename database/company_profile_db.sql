-- =====================================================================
-- DATABASE: company_profile_db (Personal Company Profile - Teknik Informatika)
-- Author  : Syauqi Abduraffi (Jurusan Teknik Informatika)
-- Sistem  : Strive Frontend + AppDashboard Backend + E-Library Portfolio
-- Support : MySQL / MariaDB (XAMPP / Laragon / Herd) & Cloud SQL
-- =====================================================================

CREATE DATABASE IF NOT EXISTS `company_profile_db`
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE `company_profile_db`;

-- ---------------------------------------------------------------------
-- 1. Tabel Profil Pribadi / Identitas (profile_settings)
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `profile_settings` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `sitename` VARCHAR(100) NOT NULL DEFAULT 'SyauqiDev',
  `full_name` VARCHAR(150) NOT NULL DEFAULT 'Syauqi Abduraffi',
  `major` VARCHAR(150) NOT NULL DEFAULT 'Teknik Informatika (Informatics Engineering)',
  `hero_title` VARCHAR(255) NOT NULL,
  `hero_description` TEXT NOT NULL,
  `about_heading` VARCHAR(255) NOT NULL,
  `about_lead` TEXT NOT NULL,
  `years_experience` VARCHAR(20) DEFAULT '4+',
  `projects_count` VARCHAR(20) DEFAULT '28+',
  `location` VARCHAR(255) DEFAULT 'Jakarta, Indonesia',
  `email` VARCHAR(150) DEFAULT 'syauqi.informatika@devmail.id',
  `phone` VARCHAR(50) DEFAULT '+62 812-8899-7766',
  `open_hours` VARCHAR(100) DEFAULT 'Senin - Sabtu: 08:00 - 21:00 WIB',
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

INSERT INTO `profile_settings` (
  `sitename`, `full_name`, `major`, `hero_title`, `hero_description`, `about_heading`, `about_lead`, `years_experience`, `projects_count`
) VALUES (
  'SyauqiDev',
  'Syauqi Abduraffi',
  'Teknik Informatika (Informatics Engineering)',
  'Inovasi Web Era Modern & Rekayasa Sistem Informasi Pro',
  'Halo! Saya Syauqi Abduraffi — Mahasiswa & Full-Stack Web Developer jurusan Teknik Informatika. Berpengalaman membangun Sistem Informasi Perpustakaan Digital (E-Library), aplikasi Web Era Modern berbasis Next.js & React, serta arsitektur Database & Backend Dashboard yang responsif.',
  'Full-Stack Developer & Kreator Solusi Digital Teknik Informatika',
  'Sebagai praktisi dari jurusan Teknik Informatika, saya memadukan logika pemrograman algoritma, perancangan database relasional yang terstruktur, serta desain UI/UX era web modern.',
  '4+',
  '28+'
);

-- ---------------------------------------------------------------------
-- 2. Tabel Keahlian / Skills Teknik Informatika (skills)
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `skills` (
  `id` VARCHAR(50) PRIMARY KEY,
  `name` VARCHAR(150) NOT NULL,
  `category` ENUM('Frontend & Web Modern', 'Backend & Programming', 'Database & Tools') NOT NULL,
  `level` INT NOT NULL DEFAULT 90,
  `badge` VARCHAR(50) DEFAULT 'Expert',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

INSERT INTO `skills` (`id`, `name`, `category`, `level`, `badge`) VALUES
('sk-1', 'Next.js 14 & React.js (Modern Web Era)', 'Frontend & Web Modern', 95, 'Expert'),
('sk-2', 'TypeScript & JavaScript (ES6+)', 'Frontend & Web Modern', 92, 'Advanced'),
('sk-3', 'Tailwind CSS, Bootstrap 5 & Responsive UI/UX', 'Frontend & Web Modern', 96, 'Expert'),
('sk-4', 'HTML5, CSS3 & Interactive Web Animation', 'Frontend & Web Modern', 98, 'Master'),
('sk-5', 'PHP & Laravel Framework (Sistem Informasi)', 'Backend & Programming', 94, 'Expert'),
('sk-6', 'Node.js & Next.js Serverless API Routes', 'Backend & Programming', 90, 'Advanced'),
('sk-7', 'Python, C++ & Struktur Data Algoritma', 'Backend & Programming', 88, 'Advanced'),
('sk-8', 'RESTful API, Auth JWT & Role Management', 'Backend & Programming', 92, 'Expert'),
('sk-9', 'MySQL, MariaDB & PostgreSQL Database', 'Database & Tools', 95, 'Expert'),
('sk-10', 'Perancangan ERD, UML & Sistem Perpustakaan', 'Database & Tools', 96, 'Expert'),
('sk-11', 'Git, GitHub & Cloud Vercel Deployment', 'Database & Tools', 93, 'Expert'),
('sk-12', 'Figma UI Prototyping & AppDashboard CMS', 'Database & Tools', 90, 'Advanced');

-- ---------------------------------------------------------------------
-- 3. Tabel Layanan Pengembangan IT (services)
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `services` (
  `id` VARCHAR(50) PRIMARY KEY,
  `number` VARCHAR(10) NOT NULL,
  `title` VARCHAR(200) NOT NULL,
  `description` TEXT NOT NULL,
  `icon` VARCHAR(50) DEFAULT 'BarChart3'
) ENGINE=InnoDB;

INSERT INTO `services` (`id`, `number`, `title`, `description`, `icon`) VALUES
('srv-1', '01', 'Website Sistem Informasi Perpustakaan (E-Library)', 'Pembuatan web perpustakaan digital modern lengkap dengan katalog buku OPAC, peminjaman & pengembalian online, cetak kartu anggota QR/Barcode, dan kalkulasi denda otomatis.', 'BarChart3'),
('srv-2', '02', 'Pengembangan Web Era Modern (Next.js & React)', 'Transformasi website konvensional menjadi web generasi baru yang super cepat, SEO-friendly, interaktif, dan langsung siap di-deploy ke cloud seperti Vercel.', 'TrendingUp'),
('srv-3', '03', 'Perancangan Database & Sistem Informasi Akademik', 'Desain arsitektur database MySQL/PostgreSQL yang ternormalisasi dengan baik untuk SIAKAD, E-Learning, dan inventaris laboratorium.', 'ShieldCheck'),
('srv-4', '04', 'Pembuatan Backend Admin & Command Center', 'Pengembangan dashboard admin berkelas profesional (AppDashboard) dengan grafik analitik real-time, tabel data interaktif, dan laporan.', 'Lightbulb'),
('srv-5', '05', 'Desain UI/UX Responsif Semua Device (HP, Tablet, PC)', 'Perancangan antarmuka website yang adaptif, estetis, dan nyaman digunakan di layar smartphone, tablet, laptop, maupun monitor lebar.', 'Users');

-- ---------------------------------------------------------------------
-- 4. Tabel Portofolio Proyek (portfolio_projects)
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `portfolio_projects` (
  `id` VARCHAR(50) PRIMARY KEY,
  `title` VARCHAR(255) NOT NULL,
  `subtitle` VARCHAR(150) NOT NULL,
  `category` VARCHAR(100) NOT NULL,
  `tags` VARCHAR(255) NOT NULL,
  `image` VARCHAR(500) NOT NULL,
  `description` TEXT,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

INSERT INTO `portfolio_projects` (`id`, `title`, `subtitle`, `category`, `tags`, `image`, `description`) VALUES
('port-1', 'SIMPUS Pro — Website Sistem Informasi Perpustakaan Digital', 'Unggulan • E-Library & OPAC System', 'Sistem Informasi', 'Web Perpustakaan, Database SQL, QR Code', 'https://bootstrapmade.com/content/demo/Strive/assets/img/portfolio/portfolio-1.webp', 'Proyek unggulan Sistem Informasi Perpustakaan berbasis web modern. Mendukung pencarian katalog buku cepat (OPAC), transaksi peminjaman & pengembalian buku real-time, dan denda otomatis.'),
('port-2', 'NextEra Portal — Transformasi Web Era Modern & SaaS', 'Web Era Baru • Next.js 14 Full-Stack', 'Web Era Modern', 'Next.js, Tailwind CSS, Vercel Ready', 'https://bootstrapmade.com/content/demo/Strive/assets/img/portfolio/portfolio-4.webp', 'Pengembangan website generasi baru yang menampilkan standar desain Web Era Modern dengan kecepatan muat instan.'),
('port-3', 'AppDashboard Command Center — Admin CMS & Database Suite', 'Backend Dashboard & Analytics', 'Database & CMS', 'AppDashboard, Database CRUD, Analytics', 'https://bootstrapmade.com/content/demo/Strive/assets/img/portfolio/portfolio-2.webp', 'Sistem Backend Command Center modern untuk memantau trafik, mengelola database portofolio, keahlian (skills), dan pesan masuk.'),
('port-4', 'SIAKAD Informatika — Portal Akademik & KRS Mahasiswa', 'Sistem Informasi Kampus', 'Sistem Informasi', 'SIAKAD, Teknik Informatika, MySQL', 'https://bootstrapmade.com/content/demo/Strive/assets/img/portfolio/portfolio-3.webp', 'Aplikasi web akademik terpadu untuk pengelolaan Kartu Rencana Studi (KRS), jadwal perkuliahan laboratorium, dan rekap nilai IPK.'),
('port-5', 'SmartLab Inventory — Sistem Peminjaman Alat Lab Komputer', 'Manajemen Aset & Laboratorium', 'Full-Stack App', 'Inventaris Lab, Full-Stack, REST API', 'https://bootstrapmade.com/content/demo/Strive/assets/img/portfolio/portfolio-5.webp', 'Sistem informasi pelacakan peminjaman perangkat keras laboratorium Teknik Informatika.'),
('port-6', 'DigiBook Reader — Platform Baca E-Jurnal & Skripsi Kampus', 'Repository Digital & E-Journal', 'Web Era Modern', 'Repository, E-Library, Modern UI', 'https://bootstrapmade.com/content/demo/Strive/assets/img/portfolio/portfolio-6.webp', 'Ekosistem Website Perpustakaan untuk publikasi jurnal ilmiah dan repositori skripsi mahasiswa Teknik Informatika.');

-- ---------------------------------------------------------------------
-- 5. Tabel Contoh Modul Website Perpustakaan (library_books_catalog)
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `library_books_catalog` (
  `book_code` VARCHAR(30) PRIMARY KEY,
  `isbn` VARCHAR(30) NOT NULL,
  `title` VARCHAR(255) NOT NULL,
  `author` VARCHAR(150) NOT NULL,
  `category` VARCHAR(100) NOT NULL,
  `shelf_location` VARCHAR(50) NOT NULL,
  `stock` INT NOT NULL DEFAULT 5,
  `status` ENUM('Tersedia', 'Dipinjam') DEFAULT 'Tersedia'
) ENGINE=InnoDB;

INSERT INTO `library_books_catalog` (`book_code`, `isbn`, `title`, `author`, `category`, `shelf_location`, `stock`, `status`) VALUES
('BK-TI-001', '978-602-001', 'Algoritma & Struktur Data Modern dengan TypeScript & C++', 'Dr. Rinaldi Munir', 'Ilmu Komputer', 'Rak A-01', 8, 'Tersedia'),
('BK-TI-002', '978-602-002', 'Rekayasa Perangkat Lunak & Arsitektur Web Era Baru (Next.js)', 'Syauqi Abduraffi', 'Web Engineering', 'Rak A-02', 12, 'Tersedia'),
('BK-TI-003', '978-602-003', 'Sistem Basis Data Relasional: Desain ERD & Optimasi SQL', 'Abdul Kadir', 'Database', 'Rak B-01', 6, 'Tersedia'),
('BK-TI-004', '978-602-004', 'Jaringan Komputer, Cloud Computing & Keamanan Siber', 'Onno W. Purbo', 'Jaringan & Cloud', 'Rak C-03', 4, 'Dipinjam');

-- ---------------------------------------------------------------------
-- 6. Tabel Pesan Kontak Masuk (contact_messages)
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `contact_messages` (
  `id` VARCHAR(50) PRIMARY KEY,
  `name` VARCHAR(150) NOT NULL,
  `email` VARCHAR(150) NOT NULL,
  `subject` VARCHAR(255) NOT NULL,
  `message` TEXT NOT NULL,
  `status` ENUM('unread', 'read', 'replied') DEFAULT 'unread',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- ---------------------------------------------------------------------
-- 7. Tabel Riwayat Proyek / Order di AppDashboard (project_orders)
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `project_orders` (
  `id` VARCHAR(50) PRIMARY KEY,
  `order_number` VARCHAR(50) NOT NULL,
  `customer_name` VARCHAR(150) NOT NULL,
  `customer_email` VARCHAR(150) NOT NULL,
  `product` VARCHAR(200) NOT NULL,
  `amount` VARCHAR(50) NOT NULL,
  `status` ENUM('Completed', 'Pending', 'Cancelled') DEFAULT 'Completed',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;
