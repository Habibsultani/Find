<template>
  <div>
    <form @submit.prevent="saveData">
      <div class="form-controle">
        <label for="emeil">Your email:</label>
        <input type="email" id="email" v-model.trim="email" />
      </div>
      <div class="form-controle">
        <label for="message">Your message:</label>
        <textarea id="message" rows="5" v-model.trim="message"></textarea>
      </div>
      <p v-if="!formisValid" class="errors">
        Please write your email and a non-message input.
      </p>
      <div class="action">
        <base-button>Send the message</base-button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      message: '',
      formisValid: true,
    };
  },
  methods: {
    saveData() {
      if (
        this.email === '' ||
        !this.email.includes('@') ||
        this.message === ''
      ) {
        this.formisValid = false;
      } else {
        this.formisValid = true;
      }
      const dataNew = {
        email: this.email,
        message: this.message,
        userid: this.$route.params.id,
      };
      if (this.formisValid) {
        this.$store.dispatch('requests/addNewData', dataNew);
        console.log(dataNew);

        this.$router.replace('/coaches');
      }
    },
  },
};
</script>

<style scoped>
form {
  margin: 1rem;
  border: 1px solid #ccc;
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

.errors {
  font-weight: bold;
  color: red;
}

.actions {
  text-align: center;
}
</style>
