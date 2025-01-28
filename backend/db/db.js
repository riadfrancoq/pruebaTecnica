import { Sequelize } from 'sequelize';
import models from '../models/init-models.js';
import { config } from 'dotenv';
config({override: true});

const dbValues = {
    HOST: process.env.HOST,
    USER: process.env.USER,
    PASSWORD: process.env.PASSWORD,
    DB: process.env.DB,
    DIALECT: process.env.DIALECT,
    
};

console.log(dbValues)
const sequelize = new Sequelize(dbValues.DB, dbValues.USER, dbValues.PASSWORD, {
        logging: false,
        host: dbValues.HOST,
        dialect: dbValues.DIALECT,
        pool: {
            max: 5,
            min: 0,
            acquire: 10000,
            idle: 30000
        }
});

try {
    sequelize.authenticate();
    console.log('Conectado Satisfactoriamente');
} catch (error) {
    console.error(err);    
}


const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.tables = models(sequelize);

db.sequelize.sync({force: false}).
then(()=> {
    console.log('Sincronizado');
});

export default db;