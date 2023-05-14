const express = require('express');
const dotenv = require('dotenv');
const plantRoutes = require('./routes/plantRoutes');

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use('/', plantRoutes);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
