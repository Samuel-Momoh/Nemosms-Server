const reset = (sequelize, DataTypes) => {
    const Reset = sequelize.define('password_reset', {
      email: {
        type: DataTypes.STRING,
        validate: { notEmpty: {
          args: true,
          msg: 'Email can not be empty.',
        } },
      },
      token: {
        type: DataTypes.STRING,
        validate: { notEmpty: {
          args: true,
          msg: 'Token Can not be empty.',
        } },
      },
      expires: {
        type: DataTypes.STRING,
        validate: { notEmpty: {
          args: true,
          msg: 'Expiration Can not be empty.',
        } },
      },
    });
   
    return Reset;
  };
   
  module.exports= reset;