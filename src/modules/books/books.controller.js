//* HANDLE HTTP REQUEST AND RESPONSE

// Import function
const {
  serviceGetAllBooks,
  serviceGetBook,
  serviceAddBook,
  serviceEditBook,
  serviceDeleteBook,
} = require("./books.service");
const {
  validateGetBook,
  validateAddBook,
  validateEditBook,
} = require("./books.validator");

function getAllBooksCtrl(req, res) {
  const result = serviceGetAllBooks();
  res.json(result);
}
function getBookCtrl(req, res) {
  const params = req.params;
  const validationResult = validateGetBook(params);
  if (Object.keys(validationResult).length !== 0) {
    return res.status(400).json({
      errors: validationResult,
    });
  }
  const [result, errorCode] = serviceGetBook(+params.bookID);
  if (errorCode) {
    return res.status(errorCode).json({
      errors: result,
    });
  } else {
    res.json({
      data: result,
    });
  }
}
function addBookCtrl(req, res) {
  const { body } = req;
  const validationResult = validateAddBook(body);
  if (Object.keys(validationResult).length !== 0) {
    return res.status(400).json({
      errors: validationResult,
    });
  }
  const [result, errorCode] = serviceAddBook(body);
  if (errorCode) {
    return res.status(errorCode).json({
      errors: result,
    });
  } else {
    res.json({
      data: result,
    });
    return;
  }
}
function editBookCtrl(req, res) {
  const { body } = req;
  const validationResult = validateEditBook(body);

  if (Object.keys(validationResult).length !== 0) {
    return res.status(400).json({
      errors: validationResult,
    });
  }
  const [result, errorCode] = serviceEditBook(body);
  if (errorCode) {
    return res.status(errorCode).json({
      errors: result,
    });
  } else {
    res.json({
      data: result,
    });
    return;
  }
}
function deleteBookCtrl(req, res) {
  const params = req.params;
  const validationResult = validateGetBook(params);
  if (Object.keys(validationResult).length !== 0) {
    return res.status(400).json({
      errors: validationResult,
    });
  }
  const [result, errorCode] = serviceDeleteBook(+params.bookID);
  if (errorCode) {
    return res.status(errorCode).json({
      errors: result,
    });
  } else {
    res.json({
      data: result,
    });
    return;
  }
}
// Export function
module.exports = {
  getAllBooksCtrl,
  getBookCtrl,
  addBookCtrl,
  editBookCtrl,
  deleteBookCtrl,
};
