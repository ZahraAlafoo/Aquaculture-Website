<script setup>
import { Authenticator } from "@aws-amplify/ui-vue";
import { Auth } from "aws-amplify";
import awsConfig from "../aws-exports";

Auth.configure(awsConfig);
</script>

<template>
  <section class="section profile">
    <div class="row">
      <div class="col-lg-3"></div>
      <div class="col-lg-6">
        <div class="row">
          <!-- Sales Card -->

          <!-- Reports -->
          <div class="col-12" style="margin-left: 2%;">
            <div
              style="padding: var(--amplify-space-large); text-align: center"
            >
              <img
                class="amplify-image"
                alt="Amplify logo"
                src="../../public/frontend/assets/img/Picture3.png"
              />
            </div>
            <div class="card">
              <div class="card-body pt-3">
                <!-- Bordered Tabs -->
                <ul class="nav nav-tabs nav-tabs-bordered">
                  <li class="nav-item">
                    <button
                      class="nav-link active"
                      data-bs-toggle="tab"
                      data-bs-target="#profile-overview"
                    >
                      Sign in
                    </button>
                  </li>

                  <li class="nav-item">
                    <button
                      class="nav-link"
                      data-bs-toggle="tab"
                      data-bs-target="#profile-edit"
                    >
                      Create Account
                    </button>
                  </li>
                </ul>
                <div class="tab-content pt-2">
                  <div
                    class="tab-pane fade show active profile-overview"
                    id="profile-overview"
                  >
                    <br />
                    <form v-on:submit.prevent>
                      <div class="row mb-3">
                        <label
                          for="email"
                          class="col-md-4 col-lg-3 col-form-label"
                          >Email</label
                        >
                        <div class="col-md-8 col-lg-9">
                          <input
                            name="email"
                            type="email"
                            class="form-control"
                            id="email"
                            v-model="formValues.email"
                            required
                          />
                        </div>
                      </div>

                      <div class="row mb-3">
                        <label
                          for="password"
                          class="col-md-4 col-lg-3 col-form-label"
                          >Password</label
                        >
                        <div class="col-md-8 col-lg-9">
                          <input
                            name="password"
                            type="password"
                            class="form-control"
                            id="password"
                            v-model="formValues.password"
                            required
                          />
                        </div>
                      </div>

                      <div class="text-center">
                        <button @click="submitForm" class="btn btn-primary">
                          Sign in
                        </button>
                      </div>
                    </form>
                    <router-link to="/forgotpass"
                      ><br /><a>Forgot your password?</a></router-link
                    ><br />
                  </div>
                  <div class="tab-pane fade profile-edit" id="profile-edit">
                    <form v-on:submit.prevent>
                      <div class="row mb-3">
                        <label
                          for="email2"
                          class="col-md-4 col-lg-3 col-form-label"
                          >Email*</label
                        >
                        <div class="col-md-8 col-lg-9">
                          <input
                            name="email2"
                            type="email"
                            class="form-control"
                            id="email2"
                            v-model="formValues2.email"
                          />
                          <p
                            style="color: red; display: inline; font-size: 12px"
                            id="message"
                            v-if="formValues2.email == ''"
                          >
                            *Please add your email
                          </p>
                        </div>
                      </div>

                      <div class="row mb-3">
                        <label
                          for="password2"
                          class="col-md-4 col-lg-3 col-form-label"
                          >Password*</label
                        >
                        <div class="col-md-8 col-lg-9">
                          <input
                            name="passowrd2"
                            type="password"
                            class="form-control"
                            id="password2"
                            v-model="formValues2.password"
                            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                            title="Password must have at least 8 characters. It must have lower case letters, numbers, special characters, numbers and upper case letters"
                            required
                          />
                        </div>
                      </div>

                      <div class="row mb-3">
                        <label
                          for="confirmpass"
                          class="col-md-4 col-lg-3 col-form-label"
                          >Confirm Password</label
                        >
                        <div class="col-md-8 col-lg-9">
                          <input
                            name="confirmpass"
                            type="password"
                            class="form-control"
                            id="confirmpass"
                            v-model="formValues2.confirmpass"
                          />
                          <p
                            style="color: red; display: inline; font-size: 12px"
                            id="message"
                            v-if="
                              formValues2.password != formValues2.confirmpass
                            "
                          >
                            *Password confirmation does not match
                          </p>
                        </div>
                      </div>

                      <div class="row mb-3">
                        <label
                          for="firstName"
                          class="col-md-4 col-lg-3 col-form-label"
                          >First Name*</label
                        >
                        <div class="col-md-8 col-lg-9">
                          <input
                            name="firstName"
                            type="text"
                            class="form-control"
                            id="firstName"
                            v-model="formValues2.first"
                          />
                          <p
                            style="color: red; display: inline; font-size: 12px"
                            id="message"
                            v-if="formValues2.first == ''"
                          >
                            *Please add your given name
                          </p>
                        </div>
                      </div>

                      <div class="row mb-3">
                        <label
                          for="familyName"
                          class="col-md-4 col-lg-3 col-form-label"
                          >Family Name*</label
                        >
                        <div class="col-md-8 col-lg-9">
                          <input
                            name="familyName"
                            type="text"
                            class="form-control"
                            id="familyName"
                            v-model="formValues2.family"
                          />
                          <p
                            style="color: red; display: inline; font-size: 12px"
                            id="message"
                            v-if="formValues2.family == ''"
                          >
                            *Please add your family name
                          </p>
                        </div>
                      </div>

                      <div class="row mb-3">
                        <label
                          for="Phone"
                          class="col-md-4 col-lg-3 col-form-label"
                          >Phone*</label
                        >
                        <div class="col-md-8 col-lg-9">
                          <input
                            name="phone"
                            type="tel"
                            class="form-control"
                            id="Phone"
                            v-model="formValues2.phone"
                            pattern="[+0-9]{12}"
                            title="Phone number should be written in this format (+97339999999)"
                            required
                          />
                          <p
                            style="color: red; display: inline; font-size: 12px"
                            id="message"
                            v-if="formValues2.phone == ''"
                          >
                            *Please add your phone number
                          </p>
                        </div>
                      </div>
                      <div class="text-center">
                        <button
                          @click="submitForm2"
                          class="btn btn-primary"
                          :disabled="
                            formValues2.password != formValues2.confirmpass ||
                            formValues2.email == '' ||
                            formValues2.email == ' ' ||
                            formValues2.passowrd == '' ||
                            formValues2.passowrd == ' ' ||
                            formValues2.first == '' ||
                            formValues2.first == ' ' ||
                            formValues2.family == '' ||
                            formValues2.family == ' ' ||
                            formValues2.phone == '' ||
                            formValues2.phone == ' '
                          "
                        >
                          Register
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-lg-3"></div>
    </div>
  </section>
</template>

<script>
import postscribe from "postscribe";
import dashboard from "./dashboard.vue";

export default {
  name: "Login",
  data() {
    return {
      formValues: {
        email: "",
        password: "",
      },
      formValues2: {
        email: " ",
        password: "",
        confirmpass: "",
        first: " ",
        family: " ",
        phone: " ",
      },
    };
  },
  methods: {
    async submitForm() {
      try {
        const user = await Auth.signIn(
          this.formValues.email,
          this.formValues.password
        );
        //location.reload();
        this.$router.push("/MainPage");
      } catch (error) {
        var err = error.toString();
        let text = err;
        console.log("error resending code1: ", err);
        let result = text.includes("UserNotConfirmedException");
        if (result) {
          alert("error signing in. User not confirmed");
          try {
            await Auth.resendSignUp(this.formValues.email);
          } catch (err) {
            console.log("error resending code: ", err);
          }

          this.$router.push("/confirmPage/" + this.formValues.email);
        } else {
          if (
            this.formValues.email != " " ||
            this.formValues.email != "" ||
            this.formValues.password != ""
          ) {
            if (text.includes("NotAuthorizedException")) {
              alert("Incorrect email or password");
            } else {
              if (
                !text.includes(
                  "Error: Pending sign-in attempt already in progress"
                )
              ) {
                if (text.includes("UserNotFoundException")) {
                  alert("User does not does not exist");
                } else {
                  alert("error signing in. Please try again");
                }
              }
            }
          }
        }

        console.log(error);
      }
    },
    async submitForm2() {
      try {
        const { user } = await Auth.signUp({
          username: this.formValues2.email,
          password: this.formValues2.password,
          attributes: {
            given_name: this.formValues2.first,
            family_name: this.formValues2.family,
            phone_number: this.formValues2.phone,
          },
        });
        this.$router.push("/confirmPage/" + this.formValues2.email);
      } catch (error) {
        console.log("error signing up. Please try again");
      }
    },
  },
};
</script>

<style></style>