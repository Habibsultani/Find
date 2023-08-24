export default {
  async addNewData(context, payload) {
    const newData = {
      email: payload.email,
      message: payload.message,
    };
    const response = await fetch(
      `https://http-work-5df06-default-rtdb.europe-west1.firebasedatabase.app/requests/${payload.userid}.json`,
      {
        method: 'POST',
        body: JSON.stringify(newData),
      }
    );

    if (!response.ok) {
      const error = new Error(response.message || 'faild to send the request');
      throw error;
    }
    const responseData = await response.json();

    newData.id = responseData.name;
    newData.coacheId = payload.userid;
    console.log(responseData);

    context.commit('addRequest', responseData);
  },

  async getResponseData(context) {
    const userId = context.rootGetters.userId;
    console.log(userId);
    const response = await fetch(
      `https://http-work-5df06-default-rtdb.europe-west1.firebasedatabase.app/requests/${userId}.json`
    );

    const responseData = await response.json();

    const requests = [];

    for (const key in responseData) {
      const request = {
        id: key,
        userId: userId,
        email: responseData[key].email,
        message: responseData[key].message,
      };
      requests.push(request);
    }
    console.log(requests);

    context.commit('newFetch', requests);
  },
};
