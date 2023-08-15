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

  async loadTheCoache(context) {
    const respons = await fetch(
      `https://http-work-5df06-default-rtdb.europe-west1.firebasedatabase.app/coaches.json`
    );

    const responseData = await respons.json();

    if (!respons.ok) {
      const error = new Error(
        responseData.message || 'fail to fetch, Please try again'
      );
      throw error;
    }

    const coaches = [];

    for (const key in responseData) {
      const coache = {
        id: key,
        firstName: responseData[key].firstName,
        lastName: responseData[key].lastName,
        areas: responseData[key].areas,
        description: responseData[key].description,
        hourlyRate: responseData[key].hourlyRate,
      };

      coaches.push(coache);
    }
    context.commit('setTheCoache', coaches);
  },
};
