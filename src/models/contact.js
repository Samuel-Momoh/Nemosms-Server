const contact = (sequelize, DataTypes) => {
    const Contact = sequelize.define('contacts', {
      name: {
        type: DataTypes.STRING,
        validate: { notEmpty: {
          args: true,
          msg: 'Name can not be empty.',
        } },
      },
      number: {
        type: DataTypes.STRING,
        validate: { notEmpty: {
          args: true,
          msg: 'Number Can not be empty.',
        } },
      },
    });
   
    Contact.associate = models => {
      Contact.belongsTo(models.User);
    };
   
    return Contact;
  };
   
  module.exports= contact;