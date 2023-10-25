const router = require("express").Router();

const {
  getAllBooksCtrl,
  getBookCtrl,
  addBookCtrl,
  editBookCtrl,
  deleteBookCtrl,
} = require("./books.controller");

router.get("/get-list", getAllBooksCtrl);
router.get("/get-item/:bookID", getBookCtrl);
router.post("/add", addBookCtrl);
router.put("/edit", editBookCtrl);
router.delete("/delete/:bookID", deleteBookCtrl);

module.exports = router;
