export default {
  addNewData(context, payload) {
    const newData = {
      id: new Date().toISOString(),
      email: payload.email,
      message: payload.message,
      userId: payload.userid,
    };

    context.commit('addRequest', newData);
  },
};
