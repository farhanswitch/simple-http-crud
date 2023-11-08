const express = require("express");
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const PORT = 3000;

const app = express();
const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Service Books",
    version: "1.0.0",
    description: "Service that handle CRUD operations for data books.",
    contact: {
      name: "Developer",
      email: "farhan.muhammad11@programmer.net",
    },
  },
  servers: [
    {
      url: "http://localhost:3000/",
      description: "Local Dev",
    },
  ],
};

const options = {
  swaggerDefinition,
  // Paths to files containing OpenAPI definitions
  apis: ["./api-docs/*/*.yml"],
};

const swaggerSpec = swaggerJSDoc(options);

const booksRouter = require("./modules/books/books.route");
// Handle data JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Documentation Handling
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.get("/", (req, res) => {
  res.json({
    message: "Hello World",
  });
});
app.use("/v1/books/", booksRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
