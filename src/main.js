const dotenv = require('dotenv').config();
const express = require('express');
const connectDB = require('../config/db');
const path = require('path');

const userRoutes = require('./routes/user.routes');
const postRoutes = require('./routes/post.routes');
const commentRoutes = require('./routes/comment.routes');
const tagRoutes = require('./routes/tag.routes');

const app = express();
const PORT = process.env.PORT;

app.use(express.json());


app.use('/users', userRoutes);
app.use('/posts', postRoutes);
app.use('/comments', commentRoutes);
app.use('/tags', tagRoutes);
app.use('/assets', express.static(path.join(__dirname, '../assets')));

//  -- Esto es para poder acceder a la documentación desde una ruta -- 
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(PORT, () => {
  connectDB();
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
