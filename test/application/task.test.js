const rewire = require('rewire');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

const { taskFixture, invalidTaskFixture } = require('../fixtures/task.fixture');

const task = rewire('../../src/application/task/task');

const validateTask = task.__get__('validateTask');

const { expect } = chai;
chai.use(chaiAsPromised);

describe('Application Task', () => {
  describe('validTaskOperation', () => {
    it('should validate the operation', () => {
      const result = validateTask(taskFixture);
      expect(result).equal(true);
    });

    it('should not validate the operation', () => {
      const result = validateTask(invalidTaskFixture);
      expect(result).equal(false);
    });
  });
});
