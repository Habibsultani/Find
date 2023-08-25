<template>
  <div>
    <section>
      <base-card>
        <h2>{{ fullName }}</h2>
        <h3>{{ rate }}/Hour</h3>
      </base-card>
    </section>
    <section>
      <base-card>
        <header>
          <p>Interested? attach right now!</p>
          <base-button link :to="contactLink">Contact</base-button>
        </header>
        <router-view></router-view>
      </base-card>
    </section>
    <section>
      <base-card>
        <base-badge
          v-for="area in areas"
          :key="area"
          :type="area"
          :title="area"
        ></base-badge>
        <p>{{ description }}</p>
      </base-card>
    </section>
  </div>
</template>

<script>
export default {
  props: ['id'],
  data() {
    return {
      selectedCoache: null,
    };
  },

  computed: {
    areas() {
      return this.selectedCoache.areas;
    },
    fullName() {
      return this.selectedCoache.firstName + ' ' + this.selectedCoache.lastName;
    },
    rate() {
      return this.selectedCoache.hourlyRate;
    },
    contactLink() {
      return this.$route.path + '/contact';
    },
    description() {
      return this.selectedCoache.description;
    },
  },

  created() {
    this.selectedCoache = this.$store.getters['coaches/coaches'].find(
      (coach) => coach.id === this.id
    );
  },
};
</script>
