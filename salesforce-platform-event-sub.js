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

    var tpc = {};
    var conn = new jsforce.Connection({ loginUrl: node.url });
    conn.login(node.username, node.password, function (err, userInfo) {
      if (err) {
        node.status({ fill: "red", shape: "dot", text: "Disconnected" });
        var msg = {};
        msg.error = err;
        node.send(msg);
      } else {
        node.status({ fill: "blue", shape: "dot", text: "Connected" });
        tpc = conn.streaming.topic("/event/" + node.eventname);
        tpc.subscribe(function (message) {
          var msg = {};
          msg.payload = message;
          node.send(msg);
        });
      }
    });

    node.on('close', function (done) {
      tpc.unsubscribe();
      done();
    });
  }
  RED.nodes.registerType("salesforce-platform-event-sub", SalesforcePlatformEvent);
};
