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
          <div class="col-12" :hidden="formValues.loading == 0">
            <div class="col-11">
              <button
                :hidden="formValues.useremail != 'medaar.manager@hotmail.com'"
                id="btn1"
                @click="exportGraphs()"
                class="btn btn-primary"
                style="margin-left: 76%; margin-bottom: 2%"
              >
                Export Report
              </button>
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
                      Gauge Chart
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
          <div class="col-12" :hidden="formValues.loading == 0">
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
                      Gauge Chart
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
                    <iframe
                      src="https://admin.bp-cic.com/d-solo/V29nmK8nz/dive-deep?orgId=1&theme=light&panelId=12"
                      width="100%"
                      height="300"
                      frameborder="0"
                    ></iframe>
                  </div>
                  <div class="tab-pane fade profile-edit" id="profile-edit2">
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

          <div style="margin-bottom: 10%" :hidden="formValues.loading != 0">
            <div class="loader"></div>
            Preparing the report...
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
        loading: 1,
      },
    };
  },
  methods: {
    async getDataUri(url) {
      var image = await new Promise((resolve) => {
        var image = new Image();
        image.setAttribute("crossOrigin", "anonymous"); //getting images from external domain

        image.onload = function () {
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

        image.src = url;
      });
      return image;
    },
    async exportGraphs() {
      this.formValues.loading = 0;
      var doc = new jsPDF("p", "mm", "a4");

      var image1 = await this.getDataUri(
        `https://s6nw9567xd.execute-api.us-east-1.amazonaws.com/render/d-solo/V29nmK8nz/dive-deep?orgId=1&refresh=5m&theme=light&panelId=8&width=1000&height=500&tz=Asia%2FBahrain`
      );
      var image2 = await this.getDataUri(
        `https://s6nw9567xd.execute-api.us-east-1.amazonaws.com/render/d-solo/V29nmK8nz/dive-deep?orgId=1&refresh=5m&theme=light&panelId=6&width=1000&height=500&tz=Asia%2FBahrain`
      );
      var image3 = await this.getDataUri(
        `https://s6nw9567xd.execute-api.us-east-1.amazonaws.com/render/d-solo/V29nmK8nz/dive-deep?orgId=1&refresh=5m&theme=light&panelId=12&width=1000&height=500&tz=Asia%2FBahrain`
      );
      var image4 = await this.getDataUri(
        `https://s6nw9567xd.execute-api.us-east-1.amazonaws.com/render/d-solo/V29nmK8nz/dive-deep?orgId=1&refresh=5m&theme=light&panelId=10&width=1000&height=500&tz=Asia%2FBahrain`
      );
      var date = new Date();
      doc.setFontSize(10);

      doc.setFillColor(255, 246, 246);
      doc.rect(
        0,
        0,
        doc.internal.pageSize.width,
        doc.internal.pageSize.height,
        "F"
      );
      doc.setDrawColor(112, 1, 1);
      doc.text(date.toString(), 5, 5, 0);
      doc.rect(
        20,
        20,
        doc.internal.pageSize.width - 40,
        doc.internal.pageSize.height - 40,
        "S"
      );

      doc.setTextColor("#700101");
      doc.setFontSize(20);
      doc.text("Medaar's Report", 83, 30, 0);
      doc.setFontSize(16);
      doc.text("Water temprature gauge", 75, 50, 0);
      doc.addImage(image1, "PNG", 25, 55, 160, 90);

      doc.text("Water temprature Line chart", 70, 155, 0);
      doc.addImage(image2, "PNG", 25, 160, 160, 90);

      doc.addPage("a4", "p");
      doc.setFillColor(255, 246, 246);
      doc.rect(
        0,
        0,
        doc.internal.pageSize.width,
        doc.internal.pageSize.height,
        "F"
      );
      doc.setDrawColor(112, 1, 1);
      doc.rect(
        20,
        20,
        doc.internal.pageSize.width - 40,
        doc.internal.pageSize.height - 40,
        "S"
      );
      doc.text("Disolved Oxygen gauge", 75, 40, 0);
      doc.addImage(image3, "PNG", 25, 45, 160, 90);

      doc.text("Disolved Oxygen Line chart", 70, 155, 0);
      doc.addImage(image4, "PNG", 25, 159, 160, 90);
      var name =
        "Medaar_data(" +
        date.getFullYear() +
        "-" +
        (date.getMonth() + 1) +
        "-" +
        date.getDate() +
        "_" +
        date.getHours() +
        ":" +
        date.getMinutes() +
        ":" +
        date.getSeconds() +
        ").pdf";
      doc.save(name);
      this.formValues.loading = 1;
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

.loader {
  border: 16px solid #f3f3f3;
  border-radius: 50%;
  border-top: 16px solid #844c50;
  width: 120px;
  height: 120px;
  -webkit-animation: spin 2s linear infinite; /* Safari */
  animation: spin 2s linear infinite;
  margin-left: auto;
  margin-right: auto;
  margin-top: 10%;
  margin-bottom: 2%;
}

/* Safari */
@-webkit-keyframes spin {
  0% {
    -webkit-transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
  }
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>