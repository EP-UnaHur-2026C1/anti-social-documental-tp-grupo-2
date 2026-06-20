const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log('Mongo conectado correctamente');
  } catch(error) {
    console.error('Errr conectándose a MongoDB:', error);
  }
};

module.exports = connectDB;