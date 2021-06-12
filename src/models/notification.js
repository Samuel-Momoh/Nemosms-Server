const notification = (sequelize, DataTypes) => {
    const Notification = sequelize.define('notification', {
      title: {
        type: DataTypes.STRING,
        validate: { notEmpty: {
          args: true,
          msg: 'A message has to have a text.',
        } },
      },
      message: {
        type: DataTypes.STRING,
        validate: { notEmpty: {
          args: true,
          msg: 'A message has to have a text.',
        } },
      },
      status: {
        type: DataTypes.STRING,
        validate: { notEmpty: {
          args: true,
          msg: 'A message has to have a text.',
        } },
      },
    });
   
    Notification.associate = models => {
      Notification.belongsTo(models.User);
    };
   
    return Notification;
  };
   
  module.exports= notification;