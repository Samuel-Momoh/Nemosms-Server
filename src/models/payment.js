const payment = (sequelize, DataTypes) => {
    const Payment = sequelize.define('payments', {
        paymentid: {
        type: DataTypes.STRING,
        validate: { notEmpty: {
          args: true,
          msg: 'A message has to have a text.',
        } },
      },
      channel: {
        type: DataTypes.STRING,
        validate: { notEmpty: {
          args: true,
          msg: 'A message has to have a text.',
        } },
      },
      name: {
        type: DataTypes.STRING,
        validate: { notEmpty: {
          args: true,
          msg: 'A message has to have a text.',
        } },
      },
      email: {
        type: DataTypes.STRING,
        validate: { notEmpty: {
          args: true,
          msg: 'A message has to have a text.',
        } },
      },
      naration: {
        type: DataTypes.STRING,
        validate: { notEmpty: {
          args: true,
          msg: 'A message has to have a text.',
        } },
      },
      amount: {
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
   
    Payment.associate = models => {
    Payment.belongsTo(models.User);
    };
   
    return Payment;
  };
   
  module.exports= payment;