const message = (sequelize, DataTypes) => {
    const Message = sequelize.define('message', {
      sender: {
        type: DataTypes.STRING,
        validate: { notEmpty: {
          args: true,
          msg: 'A message has to have a text.',
        } },
      },
      reciever: {
        type: DataTypes.STRING,
        validate: { notEmpty: {
          args: true,
          msg: 'A message has to have a text.',
        } },
      },
      text: {
        type: DataTypes.STRING,
        validate: { notEmpty: {
          args: true,
          msg: 'A message has to have a text.',
        } },
      },
      schedule: {
        type: DataTypes.STRING,
        validate: { notEmpty: {
          args: true,
          msg: 'A message has to have a text.',
        } },
      },
    });
   
    Message.associate = models => {
      Message.belongsTo(models.User);
    };
   
    return Message;
  };
   
  module.exports= message;