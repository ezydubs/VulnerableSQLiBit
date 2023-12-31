CREATE DATABASE IF NOT EXISTS `nodelogin` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `nodelogin`;

CREATE TABLE IF NOT EXISTS `accounts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

INSERT INTO `accounts` (`id`, `username`, `password`, `email`) VALUES (1, 'test', 'test', 'test@test.com');
INSERT INTO `accounts` (`id`, `username`, `password`, `email`) VALUES (2, 'user', 'd6a6bc0db10694a2d90e3a69648f3a03', 'ssh_user@server.com');


--ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'roots';
CREATE USER 'user'@'localhost' IDENTIFIED BY 'password';
ALTER USER 'user'@'localhost' IDENTIFIED WITH mysql_native_password BY 'roots';

flush privileges;

SELECT * FROM accounts WHERE username = 'test' AND password = 'test';