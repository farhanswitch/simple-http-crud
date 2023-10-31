CREATE DEFINER=`root`@`%` PROCEDURE IF NOT EXISTS `sp_get_all_books`()
BEGIN
  #Routine body goes here...
	SELECT bookID, titke, author
	FROM books;

  SELECT COUNT(bookID) AS total FROM books;
END