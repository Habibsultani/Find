<template>
  <section>
    <base-card>
      <h2>Register as a coach:</h2>
      <coache-form @save-data="saveData"></coache-form>
    </base-card>
  </section>
</template>

<script>
import coacheForm from '../../component/coache/coacheForm.vue';

export default {
  components: {
    coacheForm,
  },
  methods: {
    saveData(data) {
      this.$store.dispatch('coaches/registerCoach', data);
      this.$router.replace('/coaches');
    },
  },
};
</script>
