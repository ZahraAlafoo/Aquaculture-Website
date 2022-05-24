<script setup>
import { Authenticator } from "@aws-amplify/ui-vue";
import { Auth } from "aws-amplify";
import awsConfig from "../aws-exports";
import MainPage from "./MainPage.vue";
import Login from "./Login.vue";
import dashboard from "./dashboard.vue";

Auth.configure(awsConfig);
</script>

<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "Master",
  data() {
    return {
      signedIn: true,
      hydrated: true,
    };
  },
  async mounted() {
    this.hydrated = true;
  },
  async beforeCreate() {
    try {
      var email = "email";
      await Auth.currentAuthenticatedUser().then((user) => {
        email = user.attributes.email;
      });
      let url = window.location;
      if (url.toString().includes("/overview")) {
        this.$router.push("/overview");
      } else if (url.toString().includes("/notifications")) {
        this.$router.push("/notifications");
      } else if (url.toString().includes("/profile")) {
        this.$router.push("/change-profile");
      } else if (url.toString().includes("/change-oxygen")) {
        this.$router.push("/change-oxygen");
      } else if (url.toString().includes("/change-temp")) {
        this.$router.push("/change-temp");
      } else {
        this.$router.push("/MainPage");
      }
    } catch (err) {
      this.$router.push("/Login");
    }
  },
};
</script>

<style></style>