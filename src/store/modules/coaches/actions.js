export default {
  registerCoach(context, data) {
    const dataSave = {
      id: context.rootGetters.userId,
      firstName: data.name,
      lastName: data.last,
      areas: data.areaEx,
      description: data.des,
      hourlyRate: data.rate,
    };

    context.commit('registerCoach', dataSave);
  },
};
