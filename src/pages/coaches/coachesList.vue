<template>
  <section>
    <coache-filter @change-filter="setFilter"></coache-filter>
  </section>
  <section>
    <base-card>
      <div class="controls">
        <base-button class="outline" @click="loadTheNewCoache"
          >Refres</base-button
        >
        <base-button v-if="!isCoache" link to="/register"
          >Register as a coache</base-button
        >
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
import CoacheFilter from '../../component/coache/CoacheFilter.vue';

export default {
  components: {
    CoacheItems,
    CoacheFilter,
  },

  data() {
    return {
      activeFilter: {
        frontend: true,
        backend: true,
        career: true,
      },
    };
  },

  computed: {
    isCoache() {
      return this.$store.getters['coaches/isCoache'];
    },
    coachesDatas() {
      const coaches = this.$store.getters['coaches/coaches'];
      return coaches.filter((coach) => {
        if (this.activeFilter.frontend && coach.areas.includes('frontend')) {
          return true;
        }
        if (this.activeFilter.backend && coach.areas.includes('backend')) {
          return true;
        }
        if (this.activeFilter.career && coach.areas.includes('career')) {
          return true;
        }
        return false;
      });
    },

    hasCoaches() {
      return this.$store.getters['coaches/hasCoaches'];
    },
  },

  created() {
    this.loadTheNewCoache();
  },

  methods: {
    setFilter(updateFiltered) {
      this.activeFilter = updateFiltered;
    },
    loadTheNewCoache() {
      return this.$store.dispatch('coaches/loadTheCoache');
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
