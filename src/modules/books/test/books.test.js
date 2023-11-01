// Mock Database connection
const mysql = require("mysql2");
jest.mock("mysql2", () => {
  return {
    createConnection: jest.fn().mockReturnValue({
      promise: () => ({
        query: jest.fn(),
      }),
    }),
  };
});
// Import function to test
const { serviceDBGetAllBooks } = require("../books.service");
// Import repo function that u should mock
const { repoDBGetAllBooks } = require("../books.repository");
jest.mock("../books.repository");

describe("Test Books Service", () => {
  it("Get All Books: Should Pass", async () => {
    // Mock repo function
    repoDBGetAllBooks.mockReturnValueOnce([
      [
        {
          bookID: 1,
          title: "Laskar Pelangi",
          author: "Andrea Hirata",
        },
        {
          bookID: 2,
          title: "Perahu Kertas",
          author: "Dee Lestari",
        },
        {
          bookID: 3,
          title: "Geez & Ann",
          author: "Rintik Sedu",
        },
      ],
      [{ total: 3 }],
    ]);

    const res = await serviceDBGetAllBooks();
    expect(res?.total).toBe(3);
    expect(res?.data?.[0]?.title).toBe("Laskar Pelangi");
  });
});
