<template>
  <form @submit.prevent="submitData">
    <div class="form-control" :class="{ invalid: !firstname.isValid }">
      <label for="firstname">First Name</label>
      <input
        type="text"
        id="firstname"
        v-model.trim="firstname.val"
        @blur="clearValidity('firstname')"
      />
      <p v-if="!firstname.isValid">Your name is required.</p>
    </div>
    <div class="form-control" :class="{ invalid: !lastname.isValid }">
      <label for="lasttname">Last Name</label>
      <input
        type="text"
        id="lasttname"
        v-model.trim="lastname.val"
        @blur="clearValidity('lastname')"
      />
      <p v-if="!lastname.isValid">Your last name is required.</p>
    </div>
    <div class="form-control" :class="{ invalid: !description.isValid }">
      <label for="description">Description</label>
      <textarea
        id="description"
        rows="5"
        v-model.trim="description.val"
        @blur="clearValidity('description')"
      ></textarea>
      <p v-if="!description.isValid">Description should not be empty.</p>
    </div>
    <div class="form-control" :class="{ invalid: !HourlyRate.isValid }">
      <label for="rate">Hourly rate</label>
      <input
        type="number"
        id="rate"
        v-model.number="HourlyRate.val"
        @blur="clearValidity('HourlyRate')"
      />
      <p v-if="!HourlyRate.isValid">Rate should not be empty</p>
    </div>
    <div class="form-control" :class="{ invalid: !areaExperties.isValid }">
      <h2>Area of experties:</h2>
      <div>
        <input
          type="checkbox"
          id="frontend"
          value="frontend"
          v-model="areaExperties.val"
          @blur="clearValidity('areaExperties')"
        />
        <label for="frontend">Frontend Developement</label>
      </div>
      <div>
        <input
          type="checkbox"
          id="backend"
          value="backend"
          v-model="areaExperties.val"
          @blur="clearValidity('areaExperties')"
        />
        <label for="backend">Backend Developement</label>
      </div>
      <div>
        <input
          type="checkbox"
          id="career"
          value="career"
          v-model="areaExperties.val"
          @blur="clearValidity('areaExperties')"
        />
        <label for="career">Career</label>
      </div>
      <p v-if="!areaExperties.isValid">Please chosse at least one optoin.</p>
      <p v-if="!formisValid">Please correct the above error and try again.</p>
      <base-button>Register</base-button>
    </div>
  </form>
</template>

<script>
export default {
  emits: ['save-data'],
  data() {
    return {
      firstname: {
        val: '',
        isValid: true,
      },
      lastname: {
        val: '',
        isValid: true,
      },
      description: {
        val: '',
        isValid: true,
      },
      HourlyRate: {
        val: null,
        isValid: true,
      },
      areaExperties: {
        val: [],
        isValid: true,
      },
      formisValid: true,
    };
  },

  methods: {
    formValidation() {
      if (this.firstname.val === '') {
        this.firstname.isValid = false;
        this.formisValid = false;
      }
      if (this.lastname.val === '') {
        this.lastname.isValid = false;
        this.formisValid = false;
      }
      if (this.description.val === '') {
        this.description.isValid = false;
        this.formisValid = false;
      }
      if (!this.HourlyRate.val || this.HourlyRate < 0) {
        this.HourlyRate.isValid = false;
        this.formisValid = false;
      }
      if (this.areaExperties.val.length === 0) {
        this.areaExperties.isValid = false;
        this.formisValid = false;
      }
    },
    clearValidity(input) {
      this[input].isValid = true;
      this.formisValid = true;
    },
    submitData() {
      this.formValidation();
      if (!this.formisValid) {
        return;
      }
      if (this.formisValid) {
        const dataForm = {
          name: this.firstname.val,
          last: this.lastname.val,
          des: this.description.val,
          rate: this.HourlyRate.val,
          areaEx: this.areaExperties.val,
        };
        console.log(dataForm);

        this.$emit('save-data', dataForm);
      }
    },
  },
};
</script>

<style scoped>
.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  display: block;
  margin-bottom: 0.5rem;
}

input[type='checkbox'] + label {
  font-weight: normal;
  display: inline;
  margin: 0 0 0 0.5rem;
}

input,
textarea {
  display: block;
  width: 100%;
  border: 1px solid #ccc;
  font: inherit;
}

input:focus,
textarea:focus {
  background-color: #f0e6fd;
  outline: none;
  border-color: #3d008d;
}

input[type='checkbox'] {
  display: inline;
  width: auto;
  border: none;
}

input[type='checkbox']:focus {
  outline: #3d008d solid 1px;
}

h3 {
  margin: 0.5rem 0;
  font-size: 1rem;
}

.invalid label {
  color: red;
}

.invalid input,
.invalid textarea {
  border: 1px solid red;
}
</style>
