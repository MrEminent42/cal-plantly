const express = require('express');
const dotenv = require('dotenv');
const plantRoutes = require('./routes/plantRoutes');
const gardenRoutes = require('./routes/gardenRoutes');
const userRoutes = require('./routes/userRoutes');
const seedRoutes = require('./routes/seedRoutes');

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(express.json());

app.use('/', plantRoutes);
app.use('/', gardenRoutes);
app.use('/', userRoutes);
app.use('/', seedRoutes);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
