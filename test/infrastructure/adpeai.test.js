const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const nock = require('nock');
const { ADP_EAI_API } = require('../../common/constants/constants');
const { taskFixture, submitResponseFixture } = require('../fixtures/task.fixture');
const { fetchTask, postTaskResult } = require('../../src/infrastructure/adpeai');

const { expect } = chai;
chai.use(chaiAsPromised);

describe('ADP EAI', () => {
  describe('fetchTask', () => {
    it('should return the next task', async () => {
      nock(ADP_EAI_API)
        .get('/get-task')
        .reply(200, taskFixture);

      const { body } = await fetchTask();
      expect(body).to.deep.equal(
        {
          id: 1,
          operation: 'addition',
          left: 2,
          right: 2,
        },
      );
    });

    it('should throw an error if the service is down', async () => {
      nock(ADP_EAI_API)
        .get('/get-task')
        .reply(500);

      await expect(fetchTask()).to.be.rejectedWith('Fetch task error...');
    });
  });

  describe('postTaskResult', () => {
    it('should return OK', async () => {
      nock(ADP_EAI_API)
        .post('/submit-task')
        .reply(200, submitResponseFixture);

      const response = await postTaskResult();
      expect(response.statusCode).to.be.equal(200);
    });

    it('should throw an error if the value is incorrect', async () => {
      nock(ADP_EAI_API)
        .post('/submit-task')
        .reply(400);

      await expect(postTaskResult()).to.be.rejectedWith('Incorrect value in result; no ID specified; value is invalid');
    });

    it('should throw an error if the value is not found for the id', async () => {
      nock(ADP_EAI_API)
        .post('/submit-task')
        .reply(404);

      await expect(postTaskResult()).to.be.rejectedWith('Value not found for specified ID');
    });

    it('should throw an error in case of database issue', async () => {
      nock(ADP_EAI_API)
        .post('/submit-task')
        .reply(503);

      await expect(postTaskResult()).to.be.rejectedWith('Error communicating with database');
    });
  });
});
