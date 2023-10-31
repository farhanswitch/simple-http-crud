-- Ganti kelinci dengan nama database
CREATE TABLE IF NOT EXISTS `kelinci`.`books`  (
  `bookID` int NOT NULL AUTO_INCREMENT,
  `title` varchar(50) NOT NULL,
  `author` varchar(50) NOT NULL,
  PRIMARY KEY (`bookID`)
);