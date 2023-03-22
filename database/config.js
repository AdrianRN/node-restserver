const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

const dbConnection = async() => {

    try {
        
        await mongoose.connect(process.env.MONGODB_CNN);
        console.log('Conexion establecida a la base de datos');

    } catch (error) {
        console.log(error);
        throw new Error('Error conexion base de datos')
    }

}



module.exports = {
    dbConnection,

}