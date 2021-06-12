const service = (sequelize, DataTypes) => {
    const Service = sequelize.define('services', {
      name: {
        type: DataTypes.STRING,
        validate: { notEmpty: {
          args: true,
          msg: 'Name can not be empty.',
        } },
      },
      status: {
        type: DataTypes.STRING,
        validate: { notEmpty: {
          args: true,
          msg: 'Number Can not be empty.',
        } },
      },
      expire: {
        type: DataTypes.STRING,
        validate: { notEmpty: {
          args: true,
          msg: 'Number Can not be empty.',
        } },
      },
    });
   
    Service.associate = models => {
      Service.belongsTo(models.User);
    };
   
    return Service;
  };
   
  module.exports= service;