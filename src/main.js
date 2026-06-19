const express = require('express');
const app = express();
const PORT = process.env.PORT;

const userRoutes = require('./routes/user.routes');
const postRoutes = require('./routes/post.routes');
const commentRoutes = require('./routes/comment.routes');
const tagRoutes = require('./routes/tag.routes');

app.use('/posts', postRoutes);
app.use('/comments', commentRoutes);
app.use('/tags', tagRoutes);
app.use('/users', userRoutes);


//  -- Esto es para poder acceder a la documentación desde una ruta -- 
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
