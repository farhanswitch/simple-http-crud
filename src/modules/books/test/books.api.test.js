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
// Import repo function that u should mock
const { repoDBGetAllBooks } = require("../books.repository");
jest.mock("../books.repository");
const request = require("supertest");
const { app, server } = require("../../../server");

describe("TEST Endpoint /v1/books/", () => {
  it("API /v1/books/get-list-db SHOULD PASS", async () => {
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

    try {
      const response = await request(app).get("/v1/books/get-list-db");
      expect(response.status).toBe(200);
    } catch (error) {
      fail(error);
    }
  });
});

afterAll((done) => {
  // Close the server or perform any necessary cleanup
  server.close(done);
});
