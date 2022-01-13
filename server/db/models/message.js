const Sequelize = require("sequelize");
const db = require("../db");

const Message = db.define("message", {
  text: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  senderId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  read: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  }
});

Message.setRead = async (id) => {
  try {
    await  Message.findOne({ where: { id: id }}).then(message => {
      if (message) {
        message.read = true;
        message.save();
        return message;
      }
    });
  } catch (error) {
    console.log(error);
  }
}

module.exports = Message;
