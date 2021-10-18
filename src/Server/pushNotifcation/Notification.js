const PushNotifications = require("@pusher/push-notifications-server");



  

const Notification = (Title, Body) => {

   

    let beamsClient = new PushNotifications({
        instanceId: "3828568d-067a-4cba-ae01-8b29f41115ba",
        secretKey: "6837BDCD9F8AFFF900B83525DC7756E147E73EBDB29EB287F5088C6BE1388814",
      });
      beamsClient
      .publishToInterests(["hello"], {
        web: {
          notification: {
            title: Title,
            body: Body,
            deep_link: "http://localhost:3000/",
          },
        },
      })
      .then((publishResponse) => {
        console.log("Just published:", publishResponse.publishId);
      })
      .catch((error) => {
        console.log("Error:", error);
      });

     return "Notification send"
  }

  module.exports  = Notification

  

