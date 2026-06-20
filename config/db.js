const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Mongo conectado correctamente');
  } catch(error) {
    console.error('Errr conectándose a MongoDB:', error);
  }
};

module.exports = connectDB;