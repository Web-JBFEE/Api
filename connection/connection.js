const { Pool } = require("pg");
const dotenv = require("dotenv");

dotenv.config();

const pool = new Pool({
	host: process.env.DB_HOST,
	user: process.env.DB_USERNAME,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME,
	port: process.env.DB_PORT, // Biasanya 5432 untuk PostgreSQL
});

pool.connect((err) => {
	if (err) {
		console.log("error connecting: " + err.stack);
		return;
	}
	console.log("connected to PostgreSQL");
});

module.exports = pool;
