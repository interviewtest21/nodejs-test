const { fetchTask, postTaskResult } = require('../../infrastructure/adpeai');

const operations = {
  ADDITION: 'addition',
  SUBSTRACTION: 'subtraction',
  MULTIPLICATION: 'multiplication',
  DIVISION: 'division',
  REMAINDER: 'remainder',
};

const validTaskOperation = (operation) => (Object.values(operations)
  .indexOf(operation) !== -1);

const validateTask = (task) => {
  let validationErrorMessage;
  if (!task.id) {
    validationErrorMessage = 'INVALID_TASK_ID';
  }
  if (!validTaskOperation(task.operation)) {
    validationErrorMessage = 'INVALID_TASK_OPERATION';
  }
  if (!Number.isInteger(task.left)) {
    validationErrorMessage = 'INVALID_LEFT_NUMBER';
  }
  if (!Number.isInteger(task.right)) {
    validationErrorMessage = 'INVALID_RIGHT_NUMBER';
  }
  if (validationErrorMessage) {
    console.log(`INVALID TASK (${validationErrorMessage})`);
    return false;
  }
  return true;
};

const logResult = (task, result, postApiResponse) => {
  console.log('\n******************** TASK ********************');
  console.log(task);
  console.log(`\nRESULT: ${result}\n`);
  console.log('RESPONSE: ');
  console.log(postApiResponse);
  console.log('**********************************************');
};

const postResponse = (task, result) => {
  postTaskResult(task.id, result)
    .then((response) => logResult(task, result, response))
    .catch((e) => logResult(task, result, e.message));
};

const processTask = (task) => {
  if (validateTask) {
    let result = 0;
    switch (task.operation) {
      case operations.ADDITION:
        result = task.left + task.right;
        break;
      case operations.SUBSTRACTION:
        result = task.left - task.right;
        break;
      case operations.MULTIPLICATION:
        result = task.left * task.right;
        break;
      case operations.DIVISION:
        result = task.left / task.right;
        break;
      case operations.REMAINDER:
        result = task.left % task.right;
        break;
      default:
        break;
    }
    postResponse(task, result);
  }
};

const nextTask = () => {
  fetchTask()
    .then((result) => processTask(result.body))
    .catch((e) => console.log(`${e.message}\n`));
};

module.exports = {
  nextTask,
};
