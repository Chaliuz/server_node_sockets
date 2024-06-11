const WebSocket = require('ws');
const { Todo } = require("./models")

const wss = new WebSocket.Server({ port: 8080 });

// let todo_list = []

wss.broadcast = function broadcast(data) {
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  });
};

wss.on('connection', (ws) => {
  console.log('Client connected');

  ws.on('message', async (message) => {
    console.log(`Received: ${message}`);

    let parsedMessage;
    try {
      parsedMessage = JSON.parse(message);
    } catch (e) {
      console.error('Invalid JSON:', e);
      return;
    }


    let id = parsedMessage?.data?.id
    let my_message = parsedMessage?.data?.message
    let operation = parsedMessage?.data?.operation
    let status = parsedMessage?.data?.status
    // if (id !== undefined && my_message !== undefined) return

    if (operation == "create") {
      // todo_list = [...todo_list, {
      //   "id": id,
      //   "message": my_message,
      //   "status": status
      // }]

      // await sequelize.sync({ force: true });
      const save = await Todo.create({
        id: id,
        content: my_message,
        status: "not_completed"
      });

    } else if (operation == "delete") {
      // todo_list = todo_list.filter(obj => obj.id != id)
      const todo = await Todo.findByPk(id);
      await todo.destroy()


    } else if (operation == "update_message") {
      // objIndex = todo_list.findIndex(obj => obj.id == id);
      // todo_list[objIndex].message = my_message

      const todo = await Todo.findByPk(id);
      todo.content = my_message
      await todo.save()

    } else if (operation == "update_status") {
      // objIndex = todo_list.findIndex(obj => obj.id == id);
      // todo_list[objIndex].status = status

      const todo = await Todo.findByPk(id);
      todo.status = status
      await todo.save()
    }

    const todos = await Todo.findAll({
      order: [['content', 'ASC']] // trying to avoid the reorder the list in the frontend when there is some change but it doesn't work
    })
    // ws.send(JSON.stringify(todos)); // this only send the data to the current client
    wss.broadcast(JSON.stringify(todos)); // send the data to all clients
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });

  ws.on('error', (err) => {
    console.error(`WebSocket error: ${err.message}`);
  });
});

console.log('WebSocket server listening on port 8080');
