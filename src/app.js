const { nextTask } = require('./application/task/task');

setInterval(nextTask, 5000);
