const dotenv = require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT;
const connectDB = require('../config/db');
const userRoutes = require('./routes/user.routes');
const postRoutes = require('./routes/post.routes');
const commentRoutes = require('./routes/comment.routes');
const tagRoutes = require('./routes/tag.routes');

// app.use('/comments', commentRoutes);
// app.use('/tags', tagRoutes);
app.use(express.json());
app.use('/users', userRoutes);
app.use('/posts', postRoutes);


//  -- Esto es para poder acceder a la documentación desde una ruta -- 
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(PORT, () => {
  connectDB();
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
