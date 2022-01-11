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
    const message = await Message.findByPk(id);
    message.read = true;
    message.save();
  } catch (err) {
  }
}

module.exports = Message;
