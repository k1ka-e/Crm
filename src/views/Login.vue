<template>
  <form class="card auth-card" @submit.prevent="submitHandler">
    <div class="card-content">
      <span class="card-title">{{'Home_bookkeeping' |localize}}</span>
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
          >{{'Message_EmailRequired' |localize}}</small
        >
        <small
          class="helper-text invalid"
          v-else-if="$v.email.$dirty && !$v.email.email"
          >{{'Message_EmailValid' |localize}}</small
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
        <label for="password">{{'Password' |localize}}</label>
        <small
          class="helper-text invalid"
          v-if="$v.password.$dirty && !$v.password.required"
        >
          {{'Enter_password' |localize}}
        </small>
        <small
          class="helper-text invalid"
          v-else-if="$v.password.$dirty && !$v.password.minLength"
        >
          {{'Message_EnterPassword' |localize}} 
          {{ $v.password.$params.minLength.min }}
          {{'Message_MinLength' |localize}} 
          {{ password.length }}
        </small>
      </div>
    </div>
    <div class="card-action">
      <div>
        <button class="btn waves-effect waves-light auth-submit" type="submit">
          {{'To_come_in' |localize}}
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        {{'No_account' |localize}}
        <router-link to="/register">{{'Register' |localize}}</router-link>
      </p>
    </div>
  </form>
</template>

<script>
import { email, required, minLength } from "vuelidate/lib/validators";
import messages from "@/utils/messages.js";

export default {
  name: "Login",
    metaInfo() {
    return {
    title: this.$title('Login')
  }
  },
  data: () => ({
    email: "",
    password: "",
  }),
  validations: {
    email: { email, required },
    password: { required, minLength: minLength(6) },
  },
  mounted() {
    if (messages[this.$route.query.message]) {
      this.$message(messages[this.$route.query.message]);
    }
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
      };

      try {
        await this.$store.dispatch("login", formData);
        this.$router.push("/");
      } catch (e) {}
    },
  },
};
</script>