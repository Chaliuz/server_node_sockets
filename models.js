const { DataTypes } = require('sequelize');
const { sequelize } = require('./db-connection');

const Todo = sequelize.define('Todo', {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
  },
  content: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  // createdAt: {
  //   type: DataTypes.DATE,
  //   defaultValue: DataTypes.NOW
  // }
  // }, { tableName: 'todos' });
});


// module.exports = {
//   Todo
// };
console.log(Todo === sequelize.models.User); // true

module.exports = { Todo };
