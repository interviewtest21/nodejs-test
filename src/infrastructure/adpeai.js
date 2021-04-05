const request = require('superagent');
const { ADP_EAI_API } = require('../../common/constants/constants');

const fetchTask = async () => {
  let response;

  try {
    response = await request
      .get(`${ADP_EAI_API}/get-task`);
  } catch (e) {
    response = e.status;
  }

  if (response > 200) throw new Error('Fetch task error...');
  else return response;
};

const postTaskResult = async (id, result) => {
  let response;
  try {
    response = await request
      .post(`${ADP_EAI_API}/submit-task`)
      .accept('application/json')
      .send({ id, result });
  } catch (e) {
    response = e.status;
  }

  if (response === 400) throw new Error('Incorrect value in result; no ID specified; value is invalid');
  else if (response === 404) throw new Error('Value not found for specified ID');
  else if (response === 503) throw new Error('Error communicating with database');
  else return { statusCode: response.res.statusCode, statusMessage: response.res.statusMessage };
};

module.exports = {
  fetchTask, postTaskResult,
};
