<script setup>
import { Authenticator } from "@aws-amplify/ui-vue";
import "@aws-amplify/ui-vue/styles.css";
import Master from "./views/Master.vue";
</script>


<template>
  <Master />
</template>

<script>
import { Auth } from "aws-amplify";
import VueRouter from "vue-router";

export default {
  name: "App",
  methods: {
    signOut() {
      Auth.signOut();
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

#auth {
  margin-left: 550px;
}

.amplify-button[data-variation="primary"] {
  background: #ff7373;
}

.amplify-button[data-variation="primary"]:hover {
  background: red;
}

[data-amplify-authenticator] {
  --amplify-components-tabs-item-active-border-color: #ff7373;
}
</style>

