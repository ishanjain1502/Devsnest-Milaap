const {Sequelize} = require('sequelize');

const sequelize = new Sequelize(
    process.env.DATABSE_NAME,
    process.env.DATABASE_USERNAME,
    process.env.DATABASE_PASSWORD,
    {
        host: 'localhost',
        dialect: 'postgres'
    }
);

sequelize.sync();

//connecting to POSTGRES
(async function() {
    try {
        await sequelize.authenticate();
        console.log(`DB ${process.env.DATABSE_NAME}, CONNECTED SUCCESSFULLY`);
    } catch(err) {
        console.log(`Unablt to connect Database`);
    }
})();

module.exports = sequelize;