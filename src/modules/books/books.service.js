// * HANDLE BUSINESS LOGIC

// Import function
const {
  repoGetAllBooks,
  repoGetBookByID,
  repoGetBookByTitle,
  repoAddBook,
  repoEditBook,
  repoDeleteBook,
  repoDBGetAllBooks,
} = require("./books.repository");

function serviceGetAllBooks() {
  const result = repoGetAllBooks();
  return result;
}
async function serviceDBGetAllBooks() {
  const result = await repoDBGetAllBooks();
  return result;
}
function serviceGetBook(id) {
  const result = repoGetBookByID(id);
  if (result) {
    return [result, false];
  } else {
    return [
      {
        message: "Book not found!",
      },
      404,
    ];
  }
}
function serviceAddBook(book) {
  const { title } = book;
  // Cek apakah sudah ada buku dengan judul yang sama
  const isBookExists = repoGetBookByTitle(title);
  if (isBookExists) {
    return [
      {
        message: "Book already exists",
      },
      422,
    ];
  }
  // Simpan buku
  repoAddBook(book);
  return [
    {
      message: "Book saved successfully",
    },
    false,
  ];
}

function serviceEditBook(book) {
  const { title, bookID } = book;

  const isExistsByID = repoGetBookByID(bookID);
  if (!isExistsByID) {
    return [
      {
        message: "Book not found",
      },
      404,
    ];
  }

  if (JSON.stringify(book) === JSON.stringify(isExistsByID)) {
    return [
      {
        message: "There is no changes",
      },
      422,
    ];
  }
  const isExistsByTitle = repoGetBookByTitle(title);
  if (isExistsByTitle && isExistsByTitle.bookID !== bookID) {
    return [
      {
        message: "Book with same title is already exists",
      },
      422,
    ];
  }
  repoEditBook(book);
  return [
    {
      message: "Book edited successfully",
    },
    false,
  ];
}
function serviceDeleteBook(bookID) {
  const isBookExists = repoGetBookByID(bookID);
  if (!isBookExists) {
    return [
      {
        message: "Book not found",
      },
      404,
    ];
  }
  repoDeleteBook(bookID);
  return [
    {
      message: "Book deleted successfully",
    },
    false,
  ];
}
// Export function
module.exports = {
  serviceGetAllBooks,
  serviceDBGetAllBooks,
  serviceGetBook,
  serviceAddBook,
  serviceEditBook,
  serviceDeleteBook,
};
