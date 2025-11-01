const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
app.use(express.json());

const {connectDB} = require('./db/db.connect');

const userRoutes = require('./routes/user.route');
const projectRoutes = require('./routes/project.route');
const tagRoutes = require('./routes/tag.route');

connectDB();


const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use('/auth', userRoutes);
app.use('/projects', projectRoutes);
app.use('/tags', tagRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});