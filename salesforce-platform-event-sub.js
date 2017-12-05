module.exports = function (RED) {
  "use strict";

  function SalesforcePlatformEvent(n) {

    RED.nodes.createNode(this, n);

    this.sfdcConfig = RED.nodes.getNode(n.salesforce);
    this.url = this.sfdcConfig.url;
    this.username = this.sfdcConfig.username;
    this.password = this.sfdcConfig.password;
    this.eventname = n.eventname;
    this.methodname = n.methodname;

    var node = this;

    var jsforce = require("jsforce");

    const conn = new jsforce.Connection({ loginUrl: this.url });
    conn.login(this.username, this.password, function (err, userInfo) {
      if (err) {
        node.status({ fill: "red", shape: "dot", text: "Disconnected" });
        msg.error = err;
        node.send(msg);
      } else {
        node.status({ fill: "blue", shape: "dot", text: "Connected" });
        conn.streaming.topic("/event/" + node.eventname).subscribe(function (message) {
          var msg = {};
          msg.payload = message;
          node.send(msg);
        });
      }
    });

    node.on("input", function (msg) {
      
    });
  }
  RED.nodes.registerType("salesforce-platform-event-sub", SalesforcePlatformEvent);
};
