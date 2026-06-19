const express = require('express');
const app = express();
const PORT = process.env.PORT;

app.use(express.json());

app.get('/bienvenida', (req, res) => {
  res.send('¡Hola, mundo!');
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
