//* HANDLE MANIPULATING DATA

const { readFileSync, writeFileSync } = require("fs");
// Baca file
const strData = readFileSync(process.cwd() + "/data/books.json", "utf-8");
// convert string JSON ke JavaScript Object dan ambil data listBook serta bookID
const { data, bookID } = JSON.parse(strData);

/**
 * @typedef {Object} BookType
 * @property {number} bookID
 * @property {string} title
 * @property {string} author
 *
 *
 * @typedef {Object} GetAllBooksResponse
 * @property {Array<BookType>} data
 * @property {number} total
 */

/**
 * Fungsi untuk mendapatkan semua buku yang tersedia
 * @returns {GetAllBooksResponse}
 */
function repoGetAllBooks() {
  // Baca file
  const strData = readFileSync(process.cwd() + "/data/books.json", "utf-8");
  // convert string JSON ke JavaScript Object dan ambil data listBook
  const { data } = JSON.parse(strData);
  // Kembalikan data semua buku
  return {
    data: data,
    // Dapatkan total buku
    total: data.length,
  };
}
/**
 * Fungsi untuk mendapatkan buku dengan id tertentu
 * @param {number} id
 * @returns {BookType | undefined}
 */
function repoGetBookByID(id) {
  // Baca file
  const strData = readFileSync(process.cwd() + "/data/books.json", "utf-8");
  // convert string JSON ke JavaScript Object dan ambil data listBook
  const { data } = JSON.parse(strData);
  // Dapatkan buku yang memiliki id yang sesuai dengan yang dicari
  const book = data.find((item) => item.bookID === id);
  return book;
}
/**
 * Fungsi untuk mendapatkan buku dengan judul tertentu
 * @param {string} title
 * @returns {BookType | undefined}
 */
function repoGetBookByTitle(title) {
  // Baca file
  const strData = readFileSync(process.cwd() + "/data/books.json", "utf-8");
  // convert string JSON ke JavaScript Object dan ambil data listBook
  const { data } = JSON.parse(strData);
  // Dapatkan buku yang memiliki judul yang sesuai dengan yang dicari
  const book = data.find((item) => item.title === title);
  return book;
}

/**
 * Fungsi untuk menambahkan buku
 * @param {BookType} book
 * @returns {void}
 */
function repoAddBook(book) {
  // Baca file
  const strData = readFileSync(process.cwd() + "/data/books.json", "utf-8");
  // convert string JSON ke JavaScript Object dan ambil data listBook serta bookID
  let { data, bookID } = JSON.parse(strData);
  // Tambahkan buku baru ke list
  data.push({
    bookID,
    title: book.title,
    author: book.author,
  });
  bookID++;
  // Tulis data yang baru ke file
  writeFileSync(
    process.cwd() + "/data/books.json",
    JSON.stringify({
      bookID,
      data,
    })
  );
}
/**
 * Fungsi untuk edit buku
 * @param {BookType} book
 * @returns {void}
 */
function repoEditBook(book) {
  // Baca file
  const strData = readFileSync(process.cwd() + "/data/books.json", "utf-8");
  // convert string JSON ke JavaScript Object dan ambil data listBook serta bookID
  let { data, bookID } = JSON.parse(strData);
  // Edit buku yang memiliki id yang sama
  const editedListBook = data.map((item) => {
    if (item.bookID === book.bookID) {
      return book;
    }
    return item;
  });
  // Tulis data yang baru ke file
  writeFileSync(
    process.cwd() + "/data/books.json",
    JSON.stringify({
      bookID,
      data: editedListBook,
    })
  );
}
/**
 * Fungsi untuk hapus buku
 * @param {number} id
 * @returns {void}
 */
function repoDeleteBook(id) {
  // Baca file
  const strData = readFileSync(process.cwd() + "/data/books.json", "utf-8");
  // convert string JSON ke JavaScript Object dan ambil data listBook serta bookID
  let { data, bookID } = JSON.parse(strData);
  // Edit buku yang memiliki id yang sama
  const editedListBook = data.filter((item) => item.bookID !== id);
  // Tulis data yang baru ke file
  writeFileSync(
    process.cwd() + "/data/books.json",
    JSON.stringify({
      bookID,
      data: editedListBook,
    })
  );
}

// export function
module.exports = {
  repoGetAllBooks,
  repoGetBookByID,
  repoGetBookByTitle,
  repoAddBook,
  repoEditBook,
  repoDeleteBook,
};
