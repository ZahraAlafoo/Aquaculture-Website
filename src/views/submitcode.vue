<script setup>
import { Authenticator } from "@aws-amplify/ui-vue";
import { Auth } from "aws-amplify";
import awsConfig from "../aws-exports";

Auth.configure(awsConfig);
</script>

<template>
  <section class="section profile">
    <div class="row">
      <div
        class="col align-self-center"
        style="margin-left: 20%; margin-right: 20%"
      >
        <div style="padding: var(--amplify-space-large); text-align: center">
          <img
            class="amplify-image"
            alt="Amplify logo"
            src="../../public/frontend/assets/img/Picture3.png"
          />
        </div>
        <div class="card">
          <div class="card-body pt-3">
            <h2>Reset you password</h2>

            <div class="tab-content pt-2">
              <div
                class="tab-pane fade show active profile-overview"
                id="profile-overview"
              >
                <br />
                <form v-on:submit.prevent>
                  <div class="row mb-3">
                    <label for="code" class="col-md-4 col-lg-3 col-form-label"
                      >Code</label
                    >
                    <div class="col-md-8 col-lg-9">
                      <input
                        name="code"
                        type="number"
                        class="form-control"
                        id="code"
                        required
                        v-model="formValues.code"
                      />
                    </div>
                  </div>

                  <div class="row mb-3">
                    <label
                      for="password"
                      class="col-md-4 col-lg-3 col-form-label"
                      >New Password</label
                    >
                    <div class="col-md-8 col-lg-9">
                      <input
                        name="passowrd"
                        type="password"
                        class="form-control"
                        id="password"
                        required
                        pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}"
                        title="Password must have at least 8 characters. It must have lower case letters, special characters, numbers and upper case letters"
                        v-model="formValues.password"
                      />
                    </div>
                  </div>

                  <div class="row mb-3">
                    <label
                      for="passwordc"
                      class="col-md-4 col-lg-3 col-form-label"
                      >Repeat Password</label
                    >
                    <div class="col-md-8 col-lg-9">
                      <input
                        name="password"
                        type="password"
                        class="form-control"
                        id="passwordc"
                        v-model="formValues.passwordc"
                        required
                      />
                      <p
                        style="color: red; display: inline; font-size: 12px"
                        id="message"
                        v-if="formValues.password != formValues.passwordc"
                      >
                        *Password confirmation does not match
                      </p>
                    </div>
                  </div>

                  <div class="text-center">
                    <button
                      @click="submitForm"
                      class="btn btn-primary"
                      :disabled="
                        formValues.password != formValues.passwordc ||
                        formValues.code == '' ||
                        formValues.code == ' '
                      "
                    >
                      Submit
                    </button>
                  </div>
                </form>

                <button
                  id="resend"
                  style="
                    margin-top: 16px;
                    background-color: white;
                    color: #f14141;
                    border: 1px solid #ccd2d8;
                  "
                  @click="submitForm2"
                >
                  Resend code
                </button>
              </div>
            </div>
          </div>
          <router-link to="/Login"><a>Back to Sign In</a></router-link
          ><br />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { Auth } from "aws-amplify";
import postscribe from "postscribe";
import dashboard from "./dashboard.vue";

export default {
  name: "confirmPage",
  data() {
    return {
      formValues: {
        code: "",
        password: "",
        passwordc: "",
      },
      uid: this.$route.params.email,
    };
  },
  methods: {
    async submitForm2() {
      try {
        await Auth.forgotPassword(this.uid);
        alert("code resent successfully");
      } catch (err) {
        console.log("error resending code: ", err);
      }
    },
    async submitForm() {
      try {
         Auth.forgotPasswordSubmit(
          this.uid,
          String(this.formValues.code),
          this.formValues.password
        );

        alert("Password updated successfully");

        this.$router.push("/Login");
      } catch (error) {
        if (error.toString().includes("CodeMismatchException")) {
          alert("Invalid code. Please try again");
        } else {
          if (!error.toString().includes("InvalidPasswordException")) {
            alert(error);
          }
        }
      }
    },
  },
};
</script>

<style></style>