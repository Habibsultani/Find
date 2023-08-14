export default {
  async registerCoach(context, data) {
    const userId = context.rootGetters.userId;
    const dataSave = {
      firstName: data.name,
      lastName: data.last,
      areas: data.areaEx,
      description: data.des,
      hourlyRate: data.rate,
    };

    const response = await fetch(
      `https://http-work-5df06-default-rtdb.europe-west1.firebasedatabase.app/coaches/${userId}.json`,
      {
        method: 'PUT',
        body: JSON.stringify(dataSave),
      }
    );

    if (!response.ok) {
      // error
    }

    const responseData = await response.json();

    console.log(responseData);

    context.commit('registerCoach', {
      ...dataSave,
      id: userId,
    });
  },
};
