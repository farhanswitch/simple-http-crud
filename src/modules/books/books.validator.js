// * HANDLE VALIDATION

// Import Modules
const { isNumeric, isAlpha, isAlphanumeric } = require("validator");

function validateBookID(id) {
  if (!id) {
    return false;
  } else {
    return isNumeric(`${id}`);
  }
}
function validateBookTitle(title) {
  if (!title) {
    return false;
  }
  return isAlphanumeric(title, "en-US", { ignore: " " });
}
function validateBookAuthor(author) {
  if (!author) {
    return false;
  }
  return isAlpha(author, "en-US", { ignore: " " });
}
function validateGetBook(params) {
  const errObj = {};
  if (!validateBookID(params?.bookID)) {
    errObj["bookID"] = "Book ID is required and must be a number.";
  }
  return errObj;
}
function validateAddBook(book) {
  const errObj = {};
  if (!validateBookTitle(book?.title)) {
    errObj["title"] =
      "Book Title must contains letters, numbers, and spaces only";
  }
  if (!validateBookAuthor(book?.author)) {
    errObj["author"] = "Book Author must contains letters and spaces only";
  }
  return errObj;
}
function validateEditBook(book) {
  const errObj = {};
  if (!validateBookID(book?.bookID)) {
    errObj["bookID"] = "Book ID is required and must be a number.";
  }
  if (!validateBookTitle(book?.title)) {
    errObj["title"] =
      "Book Title must contains letters, numbers, and spaces only";
  }
  if (!validateBookAuthor(book?.author)) {
    errObj["author"] = "Book Author must contains letters and spaces only";
  }
  return errObj;
}

module.exports = { validateGetBook, validateAddBook, validateEditBook };
