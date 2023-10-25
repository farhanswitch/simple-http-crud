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
  // Set HTTP Response Headers
  res.writeHead(200, { "Content-Type": "application/json" });
  const result = serviceGetAllBooks();
  res.end(JSON.stringify(result));
}
function getBookCtrl(req, res) {
  const params = req.params;
  const validationResult = validateGetBook(params);
  if (Object.keys(validationResult).length !== 0) {
    res.writeHead(400, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        errors: validationResult,
      })
    );
    return;
  }
  const [result, errorCode] = serviceGetBook(+params.bookID);
  if (errorCode) {
    res.writeHead(errorCode, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        errors: result,
      })
    );
    return;
  } else {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        data: result,
      })
    );
    return;
  }
}
function addBookCtrl(req, res) {
  const { body } = req;
  const validationResult = validateAddBook(body);
  if (Object.keys(validationResult).length !== 0) {
    res.writeHead(400, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        errors: validationResult,
      })
    );
    return;
  }
  const [result, errorCode] = serviceAddBook(body);
  if (errorCode) {
    res.writeHead(errorCode, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        errors: result,
      })
    );
    return;
  } else {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        data: result,
      })
    );
    return;
  }
}
function editBookCtrl(req, res) {
  const { body } = req;
  const validationResult = validateEditBook(body);

  if (Object.keys(validationResult).length !== 0) {
    res.writeHead(400, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        errors: validationResult,
      })
    );
    return;
  }
  const [result, errorCode] = serviceEditBook(body);
  if (errorCode) {
    res.writeHead(errorCode, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        errors: result,
      })
    );
    return;
  } else {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        data: result,
      })
    );
    return;
  }
}
function deleteBookCtrl(req, res) {
  const params = req.params;
  const validationResult = validateGetBook(params);
  if (Object.keys(validationResult).length !== 0) {
    res.writeHead(400, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        errors: validationResult,
      })
    );
    return;
  }
  const [result, errorCode] = serviceDeleteBook(+params.bookID);
  if (errorCode) {
    res.writeHead(errorCode, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        errors: result,
      })
    );
    return;
  } else {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        data: result,
      })
    );
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
