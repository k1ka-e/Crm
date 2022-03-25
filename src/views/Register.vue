<template>
  <div>
    <form class="card auth-card" @submit.prevent="submitHandler">
      <div class="card-content">
        <span class="card-title">{{ 'Home_bookkeeping' | localize }}</span>
        <div class="input-field">
          <input
            id="email"
            type="text"
            v-model.trim="email"
            :class="{
              invalid:
                ($v.email.$dirty && !$v.email.required) ||
                ($v.email.$dirty && !$v.email.email),
            }"
          />
          <label for="email">Email</label>
          <small
            class="helper-text invalid"
            v-if="$v.email.$dirty && !$v.email.required"
            >{{ 'Message_EmailRequired' | localize }}</small
          >
          <small
            class="helper-text invalid"
            v-else-if="$v.email.$dirty && !$v.email.email"
            >{{ 'Message_EmailValid' | localize }}</small
          >
        </div>
        <div class="input-field">
          <input
            id="password"
            type="password"
            v-model.trim="password"
            :class="{
              invalid:
                ($v.password.$dirty && !$v.password.required) ||
                ($v.password.$dirty && !$v.password.minLength),
            }"
          />
          <label for="password">{{ 'Password' | localize }}</label>
          <small
            class="helper-text invalid"
            v-if="$v.password.$dirty && !$v.password.required"
          >
            {{ 'Enter_password' | localize }}
          </small>
          <small
            class="helper-text invalid"
            v-else-if="$v.password.$dirty && !$v.password.minLength"
          >
           {{ 'Message_EnterPassword' | localize }} {{ $v.password.$params.minLength.min }}
            {{ 'Message_MinLength' | localize }}  {{ password.length }}
          </small>
        </div>
        <div class="input-field">
          <input
            id="name"
            type="text"
            v-model.trim="name"
            :class="$v.name.$dirty && !$v.name.required"
          />
          <label for="name">{{ 'Name' | localize }}</label>
          <small
            class="helper-text invalid"
            v-if="$v.name.$dirty && !$v.name.required"
          >
           {{ 'Message_EnterName' | localize }}
          </small>
        </div>
        <p>
          <label>
            <input type="checkbox" v-model="agree" />
            <span>{{ 'Rules' | localize }}</span>
          </label>
        </p>
      </div>
      <div class="card-action">
        <div>
          <button
            class="btn waves-effect waves-light auth-submit"
            type="submit"
          >
            {{ 'Register' | localize }}
            <i class="material-icons right">send</i>
          </button>
        </div>

        <p class="center">
          {{ 'Have_account' | localize }}
          <router-link to="/login">{{ 'To_come_in' | localize }}</router-link>
        </p>
      </div>
    </form>
  </div>
</template>

<script>
import { email, required, minLength } from "vuelidate/lib/validators";

export default {
  name: "register",
    metaInfo() {
    return {
    title: this.$title('Register')
  }
  },
  data: () => ({
    email: "",
    password: "",
    name: "",
    agree: false,
  }),
  validations: {
    email: { email, required },
    password: { required, minLength: minLength(6) },
    name: { required },
    agree: { checked: (v) => v },
  },

  methods: {
    async submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }

      const formData = {
        email: this.email,
        password: this.password,
        name: this.name,
      };

      try {
        await this.$store.dispatch("register", formData);
        this.$router.push("/");
      } catch (e) {}
    },
  },
};
</script>