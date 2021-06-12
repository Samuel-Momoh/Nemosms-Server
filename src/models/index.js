
import Sequelize from 'sequelize';
const path = require('path');
const sequelize = new Sequelize(
  process.env.DATABASE,
  process.env.DATABASE_USER,
  process.env.DATABASE_PASSWORD,
  {
    dialect: 'postgres',
  },
);
sequelize.authenticate()
.then(() => {
  console.log("connected to DB");
});
const models = {
  User: require(path.join(__dirname, "./user"))(sequelize, Sequelize),
  Message: require(path.join(__dirname, "./message"))(sequelize, Sequelize),
  Contact: require(path.join(__dirname, "./contact"))(sequelize, Sequelize),
  Notification: require(path.join(__dirname, "./notification"))(sequelize, Sequelize),
  Payment: require(path.join(__dirname, "./payment"))(sequelize, Sequelize),
  Service: require(path.join(__dirname, "./service"))(sequelize, Sequelize),
  LongNumber: require(path.join(__dirname, "./longnumber"))(sequelize, Sequelize),
  Reset: require(path.join(__dirname, "./passwordRecovery"))(sequelize, Sequelize),
};
 
Object.keys(models).forEach(key => {
  if ('associate' in models[key]) {
    models[key].associate(models);
  }
});
 
export { sequelize };
 
export default models;