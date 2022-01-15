-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 15, 2022 at 07:29 PM
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
-- Database: `shop`
--

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `id` int(11) NOT NULL,
  `name` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`id`, `name`) VALUES
(1, 'Nữ'),
(2, 'Nam'),
(3, 'Thể Thao'),
(4, 'Quần'),
(5, 'Áo'),
(6, 'Trẻ Em'),
(7, 'Thời Trang'),
(8, 'Gia Đình'),
(9, 'Giày');

-- --------------------------------------------------------

--
-- Table structure for table `comment`
--

CREATE TABLE `comment` (
  `id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `user_name` varchar(45) NOT NULL,
  `rating` varchar(45) NOT NULL,
  `content` varchar(600) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `contact`
--

CREATE TABLE `contact` (
  `id` int(11) NOT NULL,
  `name` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `subject` varchar(100) NOT NULL,
  `message` varchar(600) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `orderproduct`
--

CREATE TABLE `orderproduct` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `nameproduct` varchar(1000) NOT NULL,
  `address` varchar(400) NOT NULL,
  `message` varchar(1000) NOT NULL,
  `phone` varchar(15) NOT NULL,
  `image` varchar(100) DEFAULT NULL,
  `totalprice` int(15) NOT NULL,
  `status` varchar(45) NOT NULL,
  `created` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `orderproduct`
--

INSERT INTO `orderproduct` (`id`, `user_id`, `nameproduct`, `address`, `message`, `phone`, `image`, `totalprice`, `status`, `created`) VALUES
(6, 25, 'Áo Thời Trang Gucci(x)3,\nQuần Áo Trẻ Em Nike(x)2,\n', 'Đồng nai 3', 'nhớ đúng giờ', '0332458585', NULL, 26500000, 'Đã Giao', '2022-01-05 02:35:36'),
(7, 25, 'Áo Thời Trang Gucci(x)3,\nQuần ngắn thể thao Nike(x)1,\nQuần dài thể thao Adidas(x)2,\nQuần Áo Trẻ Em Nike(x)2,\n', 'Đồng nai 3', 'hàng okiê', '0332458585', NULL, 45500000, 'Chưa Giao', '2022-01-05 02:04:07');

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `id` int(11) NOT NULL,
  `category_id` int(11) NOT NULL,
  `trademark_id` int(11) NOT NULL,
  `name` varchar(150) NOT NULL,
  `quanlity` int(11) NOT NULL,
  `size` varchar(10) NOT NULL,
  `price` decimal(15,0) NOT NULL,
  `image` varchar(100) NOT NULL,
  `created` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `view` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`id`, `category_id`, `trademark_id`, `name`, `quanlity`, `size`, `price`, `image`, `created`, `view`) VALUES
(1, 3, 1, 'Giày Thể Thao Adidas Trắng', 20, '42', '4000000', 'shose-adidas-s42.jpg', '2022-01-05 01:03:38', 59),
(3, 7, 2, 'Áo Thời Trang Gucci', 40, 'XL', '7500000', 'shirt-gucci-sxl.jpg', '2022-01-05 02:01:54', 17),
(4, 3, 4, 'Quần ngắn thể thao Nike', 100, 'XL', '5000000', 'pants-nike-sport-sxl.jpg', '2022-01-05 02:03:39', 27),
(5, 3, 1, 'Quần dài thể thao Adidas', 100, 'XL', '7000000', 'pants-adias-sport-sxl-black.png', '2022-01-05 02:03:36', 5),
(6, 6, 4, 'Áo Trẻ Em Nike', 20, 'XL', '1000000', 'nike-child-shirt-sxl.jpg', '2022-01-05 01:01:38', 15),
(8, 6, 4, 'Quần Áo Trẻ Em Nike', 30, 'S', '2000000', 'nike-child-ss.jpg', '2022-01-05 02:02:00', 11),
(9, 4, 1, 'Quần Adidas Thể Thao Xám', 50, 'XL', '1500000', 'pants-adidas-sport-sxl-gray.jpg', '2021-12-14 16:14:35', 0),
(10, 4, 1, 'Quần Thời Trang Gucci', 40, 'XL', '7000000', 'pants-gucci-sxl.jpg', '2021-12-14 17:25:03', 0),
(11, 5, 2, 'Áo Thời Trang Gucci Đen', 50, 'XXL', '3000000', 'shirt-gucci-sxxl.jpg', '2022-01-01 17:19:34', 1),
(13, 9, 4, 'Giày Thời Trang Nike', 10, '41', '7000000', 'shose-nike-s41.jpg', '2021-12-14 16:19:42', 0),
(14, 9, 4, 'Giày Thể Thao Nike', 10, '42', '9000000', 'shose-nike-s42.jpg', '2021-12-14 16:21:34', 0),
(26, 2, 1, 'QUẦN SHORT TENNIS ERGO', 10, 'XL', '1250000', '16-1-2022-1-3-25-Quan_Short_Tennis_Ergo_Mau_xanh_da_troi_H50275_21_model.jpg', '2022-01-15 18:03:25', 0),
(27, 9, 1, 'GIÀY SUPERSTAR', 10, '42', '2500000', '16-1-2022-1-5-10-SUPERSTAR_trang_FZ1968_01_standard.jpg', '2022-01-15 18:05:10', 0),
(28, 9, 1, 'GIÀY ULTRABOOST 22', 10, '43', '5000000', '16-1-2022-1-5-55-ULTRABOOST_22_DJen_GZ0127_01_standard.jpg', '2022-01-15 18:05:55', 0),
(29, 9, 1, 'GIÀY ZX 5K BOOST', 10, '40', '4200000', '16-1-2022-1-7-0-Giay_ZX_5K_Boost_mau_xanh_la_GV7699_01_standard.jpg', '2022-01-15 18:07:00', 0),
(30, 8, 1, 'ÁO THUN TẾT', 10, 'L', '950000', '16-1-2022-1-7-44-Ao_Thun_Tet_DJen_HC0574_21_model.jpg', '2022-01-15 18:07:44', 0),
(31, 2, 1, 'ÁO M FI 3BAR TEE', 10, 'XL', '750000', '16-1-2022-1-8-27-M_FI_3BAR_TEE_Hong_HF4753_21_model.jpg', '2022-01-15 18:08:27', 0),
(32, 5, 1, 'ÁO HOODIE LOGO TẾT', 10, 'M', '2300000', '16-1-2022-1-9-10-Ao_Hoodie_Logo_Tet_DJen_HD0319_21_model.jpg', '2022-01-15 18:09:10', 0),
(33, 5, 1, 'ÁO HOODIE BA LÁ CLASSICS ADICOLOR', 10, 'XL', '1900000', '16-1-2022-1-10-0-Ao_Hoodie_Ba_La_Classics_Adicolor_DJen_H06667_21_model.jpg', '2022-01-15 18:10:00', 0),
(34, 3, 1, 'ÁO TREFOIL SCRIPT', 10, 'XL', '750000', '16-1-2022-1-17-20-TREFOIL_SCRIPT_DJen_H31329_21_model.jpg', '2022-01-15 18:17:20', 0),
(35, 3, 1, 'ÁO THUN CAMO PACK', 10, 'L', '750000', '16-1-2022-1-17-58-Ao_Thun_Camo_Pack_trang_H13500_21_model.jpg', '2022-01-15 18:17:58', 0),
(36, 1, 1, 'ÁO GIÓ W.N.D. ADIDAS SPORTSWEAR', 10, 'XL', '2400000', '16-1-2022-1-19-2-Ao_Gio_W.N.D._adidas_Sportswear_DJen_GT9754_21_model.jpg', '2022-01-15 18:19:02', 0),
(37, 1, 1, 'ÁO THUN GRAPHIC LOGO FUTURE ICONS ADIDAS SPORTSWEAR', 10, 'XL', '750000', '16-1-2022-1-19-43-Ao_Thun_Graphic_Logo_Future_Icons_adidas_Sportswear_Hong_H24101_21_model.jpg', '2022-01-15 18:19:44', 0),
(38, 4, 1, 'QUẦN SHORT 2 TRONG 1 VẢI DỆT 3 SỌC PACER', 10, 'L', '800000', '16-1-2022-1-21-14-Quan_short_2_trong_1_vai_det_3_Soc_Pacer_DJen_GL7686_21_model.jpg', '2022-01-15 18:21:14', 0);

-- --------------------------------------------------------

--
-- Table structure for table `trademark`
--

CREATE TABLE `trademark` (
  `id` int(11) NOT NULL,
  `name` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `trademark`
--

INSERT INTO `trademark` (`id`, `name`) VALUES
(1, 'ADIDAS'),
(2, 'GUCCI'),
(3, 'DIOR'),
(4, 'NIKE'),
(5, 'LOUIS VUITTON'),
(6, 'CHAMPION');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `name` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `phone` varchar(15) NOT NULL,
  `address` varchar(150) NOT NULL,
  `password` varchar(100) NOT NULL,
  `admin` tinyint(1) NOT NULL,
  `verify` tinyint(1) NOT NULL,
  `locked` tinyint(1) NOT NULL,
  `created` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `name`, `email`, `phone`, `address`, `password`, `admin`, `verify`, `locked`, `created`) VALUES
(25, 's', 's@gmail.com', '0332458585', 'Đồng nai 3', '$2a$10$0Mi1bu5pdrYnJD.a6bfGre8nRuF4/TAmMHr5ojmMaQ4o8dSNydikC', 0, 1, 0, '2022-01-03 11:02:16'),
(26, 'NGOCSON', 'ss@gmail.com', '033', 'VT', '$2a$10$LlrW9hqwdAckSYGxhqsmd.WaJFV5OjmTxtsqBXa.AT1TATxC7Ogui', 1, 1, 0, '2022-01-03 04:44:33'),
(28, 'son1', 'son1@gmail.com', '033245', 'Đà Lạt', '$2a$10$sfNVyh1OK3gbkf5BrUpzzO29A0HZd3SohjOCkhnRuaXBMaE1ejZ.G', 0, 1, 0, '2022-01-01 22:01:47'),
(29, 'NGOCSON', 'ad@gmail.com', '0332458585', '38/4, Tây Hòa', '$2a$10$.S1OLWi/7whX7CssErFzC.7wTBCjGPMOcm7o7ED7J2v3u.ANIu1jO', 1, 1, 0, '2022-01-01 22:01:50'),
(37, 'NGOCSON', 'sondn3008@gmail.com', '0332458585', '38/4, Tây Hòa', '$2a$10$rI4uOK0Co4o517qb6bt8mOgsk/ybq0UdVosOahGK02BLTpI57QnNC', 0, 1, 0, '2022-01-03 03:55:10'),
(38, 'NGOCSON', 's', '0332458585', '38/4, Tây Hòa', '$2a$10$.cpJ1hMvhQFn690At.nYDebL7i4jEp0DyVbgoz5KI6Hohz67e0hfG', 1, 0, 0, '2022-01-01 21:31:29');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `comment`
--
ALTER TABLE `comment`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_comment_product` (`product_id`);

--
-- Indexes for table `contact`
--
ALTER TABLE `contact`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `orderproduct`
--
ALTER TABLE `orderproduct`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`id`),
  ADD KEY `category_id` (`category_id`),
  ADD KEY `trademark_id` (`trademark_id`);

--
-- Indexes for table `trademark`
--
ALTER TABLE `trademark`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `comment`
--
ALTER TABLE `comment`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `contact`
--
ALTER TABLE `contact`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `orderproduct`
--
ALTER TABLE `orderproduct`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;

--
-- AUTO_INCREMENT for table `trademark`
--
ALTER TABLE `trademark`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `comment`
--
ALTER TABLE `comment`
  ADD CONSTRAINT `fk_comment_product` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`);

--
-- Constraints for table `product`
--
ALTER TABLE `product`
  ADD CONSTRAINT `product_ibfk_2` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`),
  ADD CONSTRAINT `product_ibfk_3` FOREIGN KEY (`trademark_id`) REFERENCES `trademark` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
