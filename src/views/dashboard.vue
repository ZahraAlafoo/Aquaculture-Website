<template>
  <div class="pagetitle">
    <h1>Dashboard</h1>
    <nav>
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><a href="index.html">Home</a></li>
        <li class="breadcrumb-item active">Dashboard</li>
      </ol>
    </nav>
  </div>
  <!-- End Page Title -->
  <section class="section dashboard">
    <div class="row">
      <!-- Left side columns -->
      <div class="col-lg-2"></div>
      <div class="col-lg-8">
        <div class="row">
          <!-- Sales Card -->

          <!-- Reports -->
          <div class="col-12">
            <button
              :hidden="formValues.useremail != 'medaar.manager@hotmail.com'"
              id="btn1"
              @click="exportGraphs()"
              class="btn btn-primary"
              style="margin-left: 78%; margin-bottom: 2%"
            >
              Export Graphs
            </button>
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
                      Pie Chart
                    </button>
                  </li>

                  <li class="nav-item">
                    <button
                      class="nav-link"
                      data-bs-toggle="tab"
                      data-bs-target="#profile-edit"
                    >
                      Line Chart
                    </button>
                  </li>
                </ul>
                <div class="tab-content pt-2">
                  <div
                    class="tab-pane fade show active profile-overview"
                    id="profile-overview"
                  >
                    <iframe
                      src="https://admin.bp-cic.com/d-solo/V29nmK8nz/dive-deep?orgId=1&theme=light&panelId=8"
                      width="100%"
                      height="300"
                      frameborder="0"
                    ></iframe>
                  </div>
                  <div class="tab-pane fade profile-edit" id="profile-edit">
                    <iframe
                      src="https://admin.bp-cic.com/d-solo/V29nmK8nz/dive-deep?orgId=1&theme=light&panelId=6"
                      width="100%"
                      height="300"
                      id="test"
                      frameborder="0"
                    ></iframe>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Reports -->
          <div class="col-12">
            <div class="card">
              <div class="card-body pt-3">
                <!-- Bordered Tabs -->
                <ul class="nav nav-tabs nav-tabs-bordered">
                  <li class="nav-item">
                    <button
                      class="nav-link active"
                      data-bs-toggle="tab"
                      data-bs-target="#profile-overview2"
                    >
                      Pie Chart
                    </button>
                  </li>

                  <li class="nav-item">
                    <button
                      class="nav-link"
                      data-bs-toggle="tab"
                      data-bs-target="#profile-edit2"
                    >
                      Line Chart
                    </button>
                  </li>
                </ul>
                <div class="tab-content pt-2">
                  <div
                    class="tab-pane fade show active profile-overview"
                    id="profile-overview2"
                  >
                    <div class="filter">
                      <a class="icon" href="#" data-bs-toggle="dropdown"
                        ><i class="bi bi-three-dots"></i
                      ></a>
                      <ul
                        class="
                          dropdown-menu dropdown-menu-end dropdown-menu-arrow
                        "
                      >
                        <li>
                          <a
                            class="dropdown-item"
                            @click="
                              exportGraphs(
                                `https://s6nw9567xd.execute-api.us-east-1.amazonaws.com/render/d-solo/V29nmK8nz/dive-deep?orgId=1&theme=light&panelId=12&width=1000&height=500&tz=Asia%2FBahrain`,
                                'oxygen_gauge.pdf'
                              )
                            "
                            >Export as PDF</a
                          >
                        </li>
                      </ul>
                    </div>
                    <iframe
                      src="https://admin.bp-cic.com/d-solo/V29nmK8nz/dive-deep?orgId=1&theme=light&panelId=12"
                      width="100%"
                      height="300"
                      frameborder="0"
                    ></iframe>
                  </div>
                  <div class="tab-pane fade profile-edit" id="profile-edit2">
                    <div class="filter">
                      <a class="icon" href="#" data-bs-toggle="dropdown"
                        ><i class="bi bi-three-dots"></i
                      ></a>
                      <ul
                        class="
                          dropdown-menu dropdown-menu-end dropdown-menu-arrow
                        "
                      >
                        <li>
                          <a
                            class="dropdown-item"
                            @click="
                              exportGraphs(
                                `https://s6nw9567xd.execute-api.us-east-1.amazonaws.com/render/d-solo/V29nmK8nz/dive-deep?orgId=1&theme=light&panelId=10&width=1000&height=500&tz=Asia%2FBahrain`,
                                'oxygen_graph.pdf'
                              )
                            "
                            >Export as PDF</a
                          >
                        </li>
                      </ul>
                    </div>
                    <iframe
                      src="https://admin.bp-cic.com/d-solo/V29nmK8nz/dive-deep?orgId=1&theme=light&panelId=10"
                      width="100%"
                      height="300"
                      id="test"
                      frameborder="0"
                    ></iframe>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>


<script>
import { Auth } from "aws-amplify";
export default {
  name: "dashboard",
  data() {
    return {
      formValues: {
        phone_number: "",
      },
    };
  },
  methods: {
    async exportGraphs() {
      var doc = new jsPDF("p", "mm", "a4");
      //*************************first graph**************************/
      var image1 = await new Promise((resolve) => {
        var image1 = new Image();
        image1.setAttribute("crossOrigin", "anonymous"); //getting images from external domain

        image1.onload = function () {
          var canvas = document.createElement("canvas");
          canvas.width = this.naturalWidth;
          canvas.height = this.naturalHeight;

          //next three lines for white background in case png has a transparent background
          var ctx = canvas.getContext("2d");
          ctx.fillStyle = "#fff"; /// set white fill style
          ctx.fillRect(0, 0, canvas.width, canvas.height);

          canvas.getContext("2d").drawImage(this, 0, 0);

          resolve(canvas.toDataURL("image/jpeg"));
        };

        image1.src = `https://s6nw9567xd.execute-api.us-east-1.amazonaws.com/render/d-solo/V29nmK8nz/dive-deep?orgId=1&refresh=5m&theme=light&panelId=8&width=1000&height=500&tz=Asia%2FBahrain`;
      });

      //*************************second graph**************************/
      var image2 = await new Promise((resolve) => {
        var image2 = new Image();
        image2.setAttribute("crossOrigin", "anonymous"); //getting images from external domain

        image2.onload = function () {
          var canvas = document.createElement("canvas");
          canvas.width = this.naturalWidth;
          canvas.height = this.naturalHeight;

          //next three lines for white background in case png has a transparent background
          var ctx = canvas.getContext("2d");
          ctx.fillStyle = "#fff"; /// set white fill style
          ctx.fillRect(0, 0, canvas.width, canvas.height);

          canvas.getContext("2d").drawImage(this, 0, 0);

          resolve(canvas.toDataURL("image/jpeg"));
        };

        image2.src = `https://s6nw9567xd.execute-api.us-east-1.amazonaws.com/render/d-solo/V29nmK8nz/dive-deep?orgId=1&refresh=5m&theme=light&panelId=6&width=1000&height=500&tz=Asia%2FBahrain`;
      });

      //*************************third graph**************************/
      var image3 = await new Promise((resolve) => {
        var image3 = new Image();
        image3.setAttribute("crossOrigin", "anonymous"); //getting images from external domain

        image3.onload = function () {
          var canvas = document.createElement("canvas");
          canvas.width = this.naturalWidth;
          canvas.height = this.naturalHeight;

          //next three lines for white background in case png has a transparent background
          var ctx = canvas.getContext("2d");
          ctx.fillStyle = "#fff"; /// set white fill style
          ctx.fillRect(0, 0, canvas.width, canvas.height);

          canvas.getContext("2d").drawImage(this, 0, 0);

          resolve(canvas.toDataURL("image/jpeg"));
        };

        image3.src = `https://s6nw9567xd.execute-api.us-east-1.amazonaws.com/render/d-solo/V29nmK8nz/dive-deep?orgId=1&refresh=5m&theme=light&panelId=12&width=1000&height=500&tz=Asia%2FBahrain`;
      });

      //*************************fourth graph**************************/
      var image4 = await new Promise((resolve) => {
        var image4 = new Image();
        image4.setAttribute("crossOrigin", "anonymous"); //getting images from external domain

        image4.onload = function () {
          var canvas = document.createElement("canvas");
          canvas.width = this.naturalWidth;
          canvas.height = this.naturalHeight;

          //next three lines for white background in case png has a transparent background
          var ctx = canvas.getContext("2d");
          ctx.fillStyle = "#fff"; /// set white fill style
          ctx.fillRect(0, 0, canvas.width, canvas.height);

          canvas.getContext("2d").drawImage(this, 0, 0);

          resolve(canvas.toDataURL("image/jpeg"));
        };

        image4.src = `https://s6nw9567xd.execute-api.us-east-1.amazonaws.com/render/d-solo/V29nmK8nz/dive-deep?orgId=1&refresh=5m&theme=light&panelId=10&width=1000&height=500&tz=Asia%2FBahrain`;
      });

      doc.text("Water temprature gauge", 5, 5, 0);
      doc.addImage(image1, "PNG", 0, 10, 225, 112);

      doc.text("Water temprature Line chart", 5, 130, 0);
      doc.addImage(image2, "PNG", 0, 132, 225, 100);

      doc.addPage("a4", "p");

      doc.text("Disolved Oxygen gauge", 5, 5, 0);
      doc.addImage(image3, "PNG", 0, 10, 225, 112);

      doc.text("Disolved Oxygen Line chart", 5, 130, 0);
      doc.addImage(image4, "PNG", 0, 132, 225, 100);

      doc.save("Medaar_data.pdf");
    },
  },
  async beforeCreate() {
    try {
      var email = "email";
      await Auth.currentAuthenticatedUser().then((user) => {
        this.formValues.useremail = user.attributes.email;
      });
    } catch (err) {
      console.log(err);
    }
  },
  mounted: function () {
    const recaptchaScript = document.createElement("script");
    recaptchaScript.setAttribute(
      "src",
      "https://cdnjs.cloudflare.com/ajax/libs/jspdf/1.3.3/jspdf.min.js"
    );
    document.head.appendChild(recaptchaScript);
  },
};
</script>

<style>
#btn1 {
  background: #f14141;
  border: 0;
  padding: 10px 30px;
  color: #fff;
  transition: 0.4s;
  border-radius: 4px;
}

#btn1:focus {
  background: #f14141;
  border: 0;
  padding: 10px 30px;
  color: #fff;
  transition: 0.4s;
  border-radius: 4px;
}

#btn1:hover {
  background: #f35959;
}

#btn1:disabled {
  background: #f35959;
}
</style>