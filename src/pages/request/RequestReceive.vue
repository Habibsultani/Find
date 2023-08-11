<template>
  <section>
    <base-card>
      <header>
        <h2>Here is the list of requests which you recived</h2>
      </header>
      <ul v-if="hasrequests">
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
  computed: {
    newRequests() {
      return this.$store.getters['requests/requests'];
    },
    hasrequests() {
      return this.$store.getters['requests/hasRequests'];
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
