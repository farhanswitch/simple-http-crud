const conn = require("./connections/mysql");

(async function () {
  try {
    // Create table
    await conn.promise().query(
      // change kelinci with ur database name
      `CREATE TABLE IF NOT EXISTS \`kelinci\`.\`books\`  (\`bookID\` int NOT NULL AUTO_INCREMENT,\`title\` varchar(50) NOT NULL,\`author\` varchar(50) NOT NULL,PRIMARY KEY (\`bookID\`));`
    );
    // create stored procedure - get all books
    await conn.promise()
      .query(`CREATE DEFINER=\`root\`@\`%\` PROCEDURE IF NOT EXISTS \`sp_get_all_books\`()
    BEGIN
      #Routine body goes here...
      SELECT bookID, title, author
      FROM books;
      SELECT COUNT(bookID) AS total FROM books;
    END`);

    // insert data
    await conn
      .promise()
      .query(
        "INSERT INTO books(title,author) VALUES('The Da Vinci Code','Dan Brown'),('The Divine Comedy','Dante Alighieri');"
      );
    const data = await conn.promise().query("CALL sp_get_all_books();");
    console.log(data?.[0]?.[0]);
  } catch (error) {
    console.log("Error Database: ", error);
  }
})();
