-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th1 05, 2022 lúc 03:39 AM
-- Phiên bản máy phục vụ: 10.4.21-MariaDB
-- Phiên bản PHP: 8.0.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `shop`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `category`
--

DROP TABLE IF EXISTS `category`;
CREATE TABLE `category` (
  `id` int(11) NOT NULL,
  `name` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `category`
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
-- Cấu trúc bảng cho bảng `comment`
--

DROP TABLE IF EXISTS `comment`;
CREATE TABLE `comment` (
  `id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `user_name` varchar(45) NOT NULL,
  `rating` varchar(45) NOT NULL,
  `content` varchar(600) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `comment`
--

INSERT INTO `comment` (`id`, `product_id`, `user_name`, `rating`, `content`) VALUES
(1, 25, 'HN', '5', 'xinh quá'),
(2, 25, 'HoangNguyen', '5', 'ngiu tui'),
(3, 25, 'NS', '5', 'ngiu tui'),
(4, 25, 'NgocSOn', '5', 'ngiu tui'),
(5, 25, 'ss', '', 'hế hlu'),
(6, 25, 'lạc danh', '', 'ok phết');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `contact`
--

DROP TABLE IF EXISTS `contact`;
CREATE TABLE `contact` (
  `id` int(11) NOT NULL,
  `name` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `subject` varchar(100) NOT NULL,
  `message` varchar(600) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `orderproduct`
--

DROP TABLE IF EXISTS `orderproduct`;
CREATE TABLE `orderproduct` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `nameproduct` varchar(1000) NOT NULL,
  `address` varchar(400) NOT NULL,
  `message` varchar(1000) NOT NULL,
  `phone` varchar(15) NOT NULL,
  `image` varchar(100),
  `totalprice` int(15) NOT NULL,
  `status` varchar(45) NOT NULL,
  `created` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `orderproduct`
--

INSERT INTO `orderproduct` (`id`, `user_id`, `nameproduct`, `address`, `message`, `phone`, `totalprice`, `status`, `created`) VALUES
(6, 25, 'Áo Thời Trang Gucci(x)3,\nQuần Áo Trẻ Em Nike(x)2,\n', 'Đồng nai 3', 'nhớ đúng giờ', '0332458585', 26500000, 'Đã Giao', '2022-01-05 02:35:36'),
(7, 25, 'Áo Thời Trang Gucci(x)3,\nQuần ngắn thể thao Nike(x)1,\nQuần dài thể thao Adidas(x)2,\nQuần Áo Trẻ Em Nike(x)2,\n', 'Đồng nai 3', 'hàng okiê', '0332458585', 45500000, 'Chưa Giao', '2022-01-05 02:04:07');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `product`
--

DROP TABLE IF EXISTS `product`;
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
-- Đang đổ dữ liệu cho bảng `product`
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
(23, 2, 3, 'Ngoc Son', 10, '42', '6999999', '20-12-2021-23-25-50-2.jpg', '2021-12-20 16:44:58', 0),
(24, 2, 2, 'Sản phẩm', 30, '42', '70000000', '20-12-2021-23-43-9-10.jpg', '2022-01-04 19:48:54', 4),
(25, 2, 2, 'Siêu Phẩm', 30, '41', '7777777', '20-12-2021-23-44-23-13.jpg', '2022-01-04 19:45:55', 30);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `trademark`
--

DROP TABLE IF EXISTS `trademark`;
CREATE TABLE `trademark` (
  `id` int(11) NOT NULL,
  `name` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `trademark`
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
-- Cấu trúc bảng cho bảng `user`
--

DROP TABLE IF EXISTS `user`;
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
-- Đang đổ dữ liệu cho bảng `user`
--

INSERT INTO `user` (`id`, `name`, `email`, `phone`, `address`, `password`, `admin`, `verify`, `locked`, `created`) VALUES
(25, 's', 's@gmail.com', '0332458585', 'Đồng nai 3', '$2a$10$0Mi1bu5pdrYnJD.a6bfGre8nRuF4/TAmMHr5ojmMaQ4o8dSNydikC', 0, 1, 0, '2022-01-03 11:02:16'),
(26, 'NGOCSON', 'ss@gmail.com', '033', 'VT', '$2a$10$LlrW9hqwdAckSYGxhqsmd.WaJFV5OjmTxtsqBXa.AT1TATxC7Ogui', 1, 1, 0, '2022-01-03 04:44:33'),
(28, 'son1', 'son1@gmail.com', '033245', 'Đà Lạt', '$2a$10$sfNVyh1OK3gbkf5BrUpzzO29A0HZd3SohjOCkhnRuaXBMaE1ejZ.G', 0, 1, 0, '2022-01-01 22:01:47'),
(29, 'NGOCSON', 'ad@gmail.com', '0332458585', '38/4, Tây Hòa', '$2a$10$.S1OLWi/7whX7CssErFzC.7wTBCjGPMOcm7o7ED7J2v3u.ANIu1jO', 1, 1, 0, '2022-01-01 22:01:50'),
(37, 'NGOCSON', 'sondn3008@gmail.com', '0332458585', '38/4, Tây Hòa', '$2a$10$rI4uOK0Co4o517qb6bt8mOgsk/ybq0UdVosOahGK02BLTpI57QnNC', 0, 1, 0, '2022-01-03 03:55:10'),
(38, 'NGOCSON', 's', '0332458585', '38/4, Tây Hòa', '$2a$10$.cpJ1hMvhQFn690At.nYDebL7i4jEp0DyVbgoz5KI6Hohz67e0hfG', 1, 0, 0, '2022-01-01 21:31:29');

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `comment`
--
ALTER TABLE `comment`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_comment_product` (`product_id`);

--
-- Chỉ mục cho bảng `contact`
--
ALTER TABLE `contact`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `orderproduct`
--
ALTER TABLE `orderproduct`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`id`),
  ADD KEY `category_id` (`category_id`),
  ADD KEY `trademark_id` (`trademark_id`);

--
-- Chỉ mục cho bảng `trademark`
--
ALTER TABLE `trademark`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `category`
--
ALTER TABLE `category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT cho bảng `comment`
--
ALTER TABLE `comment`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT cho bảng `contact`
--
ALTER TABLE `contact`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `orderproduct`
--
ALTER TABLE `orderproduct`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT cho bảng `product`
--
ALTER TABLE `product`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT cho bảng `trademark`
--
ALTER TABLE `trademark`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT cho bảng `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `comment`
--
ALTER TABLE `comment`
  ADD CONSTRAINT `fk_comment_product` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`);

--
-- Các ràng buộc cho bảng `product`
--
ALTER TABLE `product`
  ADD CONSTRAINT `product_ibfk_2` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`),
  ADD CONSTRAINT `product_ibfk_3` FOREIGN KEY (`trademark_id`) REFERENCES `trademark` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
