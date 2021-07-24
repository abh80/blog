const express = require("express");
const SQL = require("./sql");
const app = express();
const chalk = require("chalk");
const bodyParser = require("body-parser");
if (!process.env.user) {
  require("dotenv").config();
}
app.use(bodyParser.json());
app.disable("x-powered-by");
const client = new SQL({
  user: process.env.user,
  password: process.env.password,
  database: process.env.database,
  port: process.env.port,
  host: process.env.host,
});
app.listen(process.env.PORT || 3000, () => {
  console.log(
    chalk.greenBright(
      "[API] Server listening on port " + (process.env.PORT || 3000)
    )
  );
});

app.get("/", (req, res) => {
  res.send("kek");
});
app.post("/blogs", async (req, res) => {
  if (!req.body) return res.status(400).json({ error: "No data" });
  const { author, title, content } = req.body;
  if (!author || !title || !content)
    return res.status(400).json({ error: "Improper data" });

  const id = await client.createBlog({ author, title, content });
  return res.json({
    message: "Success",
    id,
  });
});
app.get("/blog/:id", async (req, res) => {
  if (!req.params.id) return res.status(404).json({ error: "Not found" });
  try {
    const blog = await client.getBlog(req.params.id);
    return res.json(blog.rows[0]);
  } catch {
    res.status(404).send("Not found");
  }
});
