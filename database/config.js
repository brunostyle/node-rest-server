const mongoose = require('mongoose');

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGO_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log('MongoDB connected');
        
    } catch (error) {
        console.log(error);
        throw new Error('Error en la conexion a la base de datos');
    }
}

module.exports = { dbConnection };