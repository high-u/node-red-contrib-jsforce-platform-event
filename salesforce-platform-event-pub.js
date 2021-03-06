module.exports = function (RED) {
  "use strict";
  var jsforce = require("jsforce");

  function SalesforcePlatformEvent(n) {

    RED.nodes.createNode(this, n);

    this.sfdcConfig = RED.nodes.getNode(n.salesforce);
    this.url = this.sfdcConfig.url;
    this.username = this.sfdcConfig.username;
    this.password = this.sfdcConfig.password;
    this.eventname = n.eventname;
    this.methodname = n.methodname;

    var node = this;

    const conn = new jsforce.Connection({ loginUrl: node.url });
    conn.login(node.username, node.password, function (err, userInfo) {
      if (err) {
        node.status({ fill: "red", shape: "dot", text: "Disconnected" });
        var msg = {};
        msg.error = err;
        node.send(msg);
      } else {
        node.status({ fill: "blue", shape: "dot", text: "Connected" });
      }
    });

    node.on("input", function (msg) {
      conn.sobject(node.eventname).create(msg.payload, function (err, ret) {
        if (err || !ret.success) {
          msg.error = err;
          msg.return = ret;
          node.send(msg);
        } else {
          msg.payload = ret;
          node.send(msg);
        }
      });
    });
  }
  RED.nodes.registerType("salesforce-platform-event-pub", SalesforcePlatformEvent);
};
