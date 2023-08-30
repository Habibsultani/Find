export default {
  async logIn(context, payload) {
    context.dispatch('auth', {
      ...payload,
      mode: 'login',
    });
  },
  async signUp(context, payload) {
    context.dispatch('auth', {
      ...payload,
      mode: 'signup',
    });
  },

  async auth(context, payload) {
    const mode = payload.mode;

    let url =
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAkFxGbYNxr975Zlihw3r3wnDJ0PbxC_kY';

    if (mode === 'signup') {
      url =
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAkFxGbYNxr975Zlihw3r3wnDJ0PbxC_kY';
    }

    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        email: payload.email,
        password: payload.password,
        returnSecureToken: true,
      }),
    });

    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(
        responseData.message || 'Faild to send the data please try later!'
      );
      throw error;
    }
    localStorage.setItem('token', responseData.idToken);
    localStorage.setItem('userId', responseData.localId);

    context.commit('setUser', {
      token: responseData.idToken,
      userId: responseData.localId,
      expireation: responseData.expiresIn,
    });
  },

  autoLogin(context) {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    context.commit('setUser', {
      token: token,
      userId: userId,
      expireation: null,
    });
  },

  logOut(context) {
    context.commit('setUser', {
      token: null,
      userId: null,
      expireation: null,
    });
  },
};
