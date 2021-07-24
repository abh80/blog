const { Client } = require("pg");
const chalk = require("chalk");
class SQL {
  /**
   * @constructor
   * @param {Object} config
   * @param {String} config.user
   * @param {String} config.password
   * @param {String} config.database
   * @param {String} config.port
   * @param {String} config.host
   */
  constructor(config) {
    if (!config.user || !config.database || !config.password) {
      throw new Error("You must provide a user, a password and a database");
    }
    this.init(config);
  }
  /**
   * @param {Number} id
   */
  getBlog(id) {
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM blogs WHERE ID = $1;";
      this.client.query(query, [id], (err, result) => {
        if (err) reject();
        resolve(result);
      });
    });
  }
  /**
   * @param {Object} data
   * @param {String} data.title
   * @param {String} data.content
   * @param {String} data.author
   */
  async createBlog(data) {
    return new Promise((resolve, reject) => {
      if (!data || typeof data != "object")
        throw new Error("Typeof data is not object");
      const { title, content, author } = data;
      if (!title || !content || !author) return;
      const id = Math.floor(Math.random() * 1000000);
      const query =
        "INSERT INTO blogs(ID, author, title, content) VALUES ($1, $2, $3, $4);";
      this.client.query(query, [id, author, title, content], (err, result) => {
        if (err) return console.error("Error while creating blog : ", err);
        console.log(
          chalk.blueBright("[PSQL] Created a blog with title : " + title)
        );
        resolve(id);
      });
    });
  }
  async init(config) {
    this.config = config;
    this.client = new Client({
      user: this.config.user,
      password: this.config.password,
      database: this.config.database,
      port: this.config.port || 5432,
      host: this.config.host || "localhost",
    });
    await this.client.connect();
    this.client.query(
      "CREATE TABLE IF NOT EXISTS blogs(ID int , author text,title text,content text);",
      (err, result) => {
        if (err) console.error("Error while creating TABLE 'blogs' : ", err);
      }
    );
    console.log(chalk.greenBright("[PSQL] Database initialized"));
  }
}

module.exports = SQL;
