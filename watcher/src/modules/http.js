const axios = require('axios')

const getData = async function (apiUrl, apiKey, resourceId) {
  try {
    const { data } = await axios.get(
      `${apiUrl}/resource/${resourceId}`,
      {
        headers: {'x-api-key': apiKey}
      }
    );
    return data
  } catch (error) {
    throw error
  }
}

const putData = async function (apiUrl, apiKey, resourceId, data) {
  try {
    await axios.put(
      `${apiUrl}/resource/${resourceId}`,
      data,
      {
        headers: {'x-api-key': apiKey}
      }
    );
  } catch (error) {
    throw error
  }
}

module.exports = { getData, putData };
