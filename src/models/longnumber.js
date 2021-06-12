const longNumber = (sequelize, DataTypes) => {
    const LongNumber = sequelize.define('longnumber', {
      number: {
        type: DataTypes.STRING,
        validate: { notEmpty: {
          args: true,
          msg: 'Name can not be empty.',
        } },
      },
      purpose: {
        type: DataTypes.STRING,
        validate: { notEmpty: {
          args: true,
          msg: 'Number Can not be empty.',
        } },
      },
      delivery: {
        type: DataTypes.STRING,
        validate: { notEmpty: {
          args: true,
          msg: 'Number Can not be empty.',
        } },
      },
      channel: {
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
      status: {
        type: DataTypes.STRING,
        validate: { notEmpty: {
          args: true,
          msg: 'Number Can not be empty.',
        } },
      },
    });
   
    LongNumber.associate = models => {
    LongNumber.belongsTo(models.User);
    };
   
    return LongNumber;
  };
   
  module.exports= longNumber;