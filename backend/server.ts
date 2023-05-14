const express = require('express');
const dotenv = require('dotenv');
const plantRoutes = require('./routes/plantRoutes');
const gardenRoutes = require('./routes/gardenRoutes');
const userRoutes = require('./routes/userRoutes');

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use('/', gardenRoutes);
app.use('/', plantRoutes);
app.use('/', userRoutes);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
