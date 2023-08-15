<template>
  <base-dialog :show="!!error" title="An error ocurred" @close="closebtn">
    <p>{{ error }}</p>
  </base-dialog>
  <section>
    <coache-filter @change-filter="setFilter"></coache-filter>
  </section>
  <section>
    <base-card>
      <div class="controls">
        <base-button class="outline" @click="loadTheNewCoache"
          >Refres</base-button
        >
        <base-button v-if="!isCoache && !isLoading" link to="/register"
          >Register as a coache</base-button
        >
      </div>
      ALL COACHES
      <div v-if="isLoading">
        <base-spinner></base-spinner>
      </div>
      <ul v-else-if="hasCoaches">
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
      <p v-else>No coache found.</p>
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
      isLoading: false,
      error: null,
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
      return !this.isLoading && this.$store.getters['coaches/hasCoaches'];
    },
  },

  created() {
    this.loadTheNewCoache();
  },

  methods: {
    setFilter(updateFiltered) {
      this.activeFilter = updateFiltered;
    },
    async loadTheNewCoache() {
      this.isLoading = true;
      try {
        await this.$store.dispatch('coaches/loadTheCoache');
      } catch (error) {
        this.error =
          error.message || 'Something went wrong, Please try it later.';
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
