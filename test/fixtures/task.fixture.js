const taskFixture = {
  id: 1, operation: 'addition', left: 2, right: 2,
};

const invalidTaskFixture = {
  id: 1, operation: 'xyz', left: 2264090730347141, right: 4368016040422377,
};

const submitResponseFixture = { statusCode: 200, statusMessage: 'OK' };

module.exports = {
  taskFixture, invalidTaskFixture, submitResponseFixture,
};
