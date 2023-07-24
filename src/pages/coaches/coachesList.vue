<template>
  <section>FILTER</section>
  <section>
    <base-card>
      <div class="controls">
        <base-button class="outline">Refres</base-button>
        <base-button link to="/register">Register as a coache</base-button>
      </div>
      ALL COACHES
      <ul>
        <coache-items
          v-for="coache in coachesDatas"
          :key="coache.id"
          :id="coache.id"
          :first-name="coache.firstName"
          :last-name="coache.lastName"
          :rate="coache.hourlyRate"
          :areas="coache.areas"
        >
        </coache-items>
      </ul>
    </base-card>
  </section>
</template>

<script>
import CoacheItems from '../../component/coache/CoacheItems.vue';

export default {
  components: {
    CoacheItems,
  },
  computed: {
    coachesDatas() {
      return this.$store.getters['coaches/coaches'];
    },

    hasCoaches() {
      return this.$store.getters['coaches/hasCoaches'];
    },
  },
};
</script>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.controls {
  display: flex;
  justify-content: space-between;
}
</style>
