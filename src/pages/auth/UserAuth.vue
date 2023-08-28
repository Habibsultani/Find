<template>
  <div>
    <base-dialog
      :show="!!error"
      fixed
      title="An error occcured!"
      @close="btnError"
    >
      <p>{{ error }}</p>
    </base-dialog>
    <base-dialog :show="isLoading" title="Authenticating..." fixed>
      <base-spinner></base-spinner>
    </base-dialog>
    <base-card>
      <form @submit.prevent="submitData">
        <div class="form-controle">
          <label for="email">email</label>
          <input type="email" id="email" v-model.trim="email" />
        </div>
        <div class="form-controle">
          <label for="password">Password</label>
          <input type="password" id="password" v-model.trim="password" />
        </div>
        <p v-if="!isValid">
          Please enter a valid email and a password which at least must 6
          chracter
        </p>
        <base-button>{{ loginSignUpCapption }}</base-button>
        <base-button type="button" mode="flat" @click="switchThemode">{{
          switchButtonCaption
        }}</base-button>
      </form>
    </base-card>
  </div>
</template>

<script>
import BaseDialog from '../../component/ui/BaseDialog.vue';
export default {
  components: { BaseDialog },
  data() {
    return {
      email: '',
      password: '',
      mode: 'login',
      isValid: true,
      isLoading: false,
      error: null,
    };
  },

  computed: {
    loginSignUpCapption() {
      if (this.mode === 'login') {
        return 'login';
      } else {
        return 'signup';
      }
    },
    switchButtonCaption() {
      if (this.mode === 'login') {
        return 'Sign up instead';
      } else {
        return 'Log in instead';
      }
    },
  },

  methods: {
    async submitData() {
      if (
        this.email === '' ||
        !this.email.includes('@') ||
        this.password.length < 6
      ) {
        this.isValid = false;
        return;
      }

      try {
        this.isLoading = true;
        if (this.mode === 'login') {
          //// log in request
        } else {
          this.$store.dispatch('signUp', {
            email: this.email,
            password: this.password,
          });
          this.isLoading = false;
        }
      } catch (error) {
        this.error =
          error.message || 'faild to send the data, please try later!';
      }
    },

    switchThemode() {
      if (this.mode === 'login') {
        return (this.mode = 'signup');
      } else {
        return (this.mode = 'login');
      }
    },
  },
  btnError() {
    this.error = null;
  },
};
</script>

<style scoped>
form {
  margin: 1rem;
  border-radius: 12px;
  padding: 1rem;
}

.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  margin-bottom: 0.5rem;
  display: block;
}

input,
textarea {
  display: block;
  width: 100%;
  font: inherit;
  border: 1px solid #ccc;
  padding: 0.15rem;
}

input:focus,
textarea:focus {
  border-color: #3d008d;
  background-color: #faf6ff;
  outline: none;
}
</style>
