const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const postRoutes = require('./app/routes/postRoutes');
const userRoutes = require('./app/routes/userRoutes');

const app = express();
const PORT = process.env.PORT || 5000;
const DB_URI = 'mongodb+srv://Shubham:Shubham909@cluster0.d9wx7.mongodb.net/';

mongoose.connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(cors());
app.use(bodyParser.json());
app.use('/api/posts', postRoutes);
app.use('/api/users', userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
