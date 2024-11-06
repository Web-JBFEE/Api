// index.js

const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

const app = express();

// Middleware untuk parsing JSON
app.use(express.json());

// Import routes
const routes = require('./routers/routers');

// Gunakan routes dengan prefix `/api`
app.use('/api', routes);

// Menjalankan server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
