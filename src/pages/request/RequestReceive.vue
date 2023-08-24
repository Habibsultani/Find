<template>
  <base-dialog :show="!!error" title="An error ocurred" @close="closebtn">
    <p>{{ error }}</p>
  </base-dialog>
  <section>
    <base-card>
      <header>
        <h2>Here is the list of requests which you recived</h2>
      </header>
      <base-spinner v-if="isLoading"></base-spinner>
      <ul v-else-if="hasrequests && !isLoading">
        <requests-items
          v-for="req in newRequests"
          :key="req.userId"
          :email="req.email"
          :message="req.message"
        ></requests-items>
      </ul>
      <div v-else>
        <h3>You have not recived any request yet.</h3>
      </div>
    </base-card>
  </section>
</template>

<script>
import RequestsItems from '../../component/requests/RequestsItems.vue';
export default {
  components: {
    RequestsItems,
  },
  data() {
    return {
      isLoading: false,
      error: null,
    };
  },
  computed: {
    newRequests() {
      return this.$store.getters['requests/requests'];
    },
    hasrequests() {
      return this.$store.getters['requests/hasRequests'];
    },
  },
  created() {
    this.loadingData();
  },
  methods: {
    async loadingData() {
      this.isLoading = true;
      try {
        await this.$store.dispatch('requests/getResponseData');
      } catch (error) {
        this.error = error.message || 'Something went wrong!';
      }

      this.isLoading = false;
    },

    closebtn() {
      this.error = null;
    },
  },
};
</script>

<style scoped>
header {
  text-align: center;
}

ul {
  list-style: none;
  margin: 2rem auto;
  padding: 0;
  max-width: 30rem;
}

h3 {
  text-align: center;
}
</style>
