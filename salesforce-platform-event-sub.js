module.exports = function (RED) {
  "use strict";

  function SalesforcePlatformEvent(n) {

    RED.nodes.createNode(this, n);

    //console.log(n);

    this.sfdcConfig = RED.nodes.getNode(n.salesforce);
    this.url = this.sfdcConfig.url;
    this.username = this.sfdcConfig.username;
    this.password = this.sfdcConfig.password;
    this.eventname = n.eventname;
    this.methodname = n.methodname;

    var node = this;


    var jsforce = require("jsforce");
    //jsforce.config.update({
    //  username: this.username,
    //  password: this.password
    //});

    

    const conn = new jsforce.Connection({ loginUrl: this.url });
    conn.login(this.username, this.password, function (err, userInfo) {
      if (err) {
        node.status({ fill: "red", shape: "dot", text: "Disconnected" });
        msg.error = err;
        node.send(msg);
      } else {
        
        //if (node.eventname) {
          node.status({ fill: "blue", shape: "dot", text: "Connected" });
          conn.streaming.topic("/event/" + node.eventname).subscribe(function (message) {
            console.log('Received :' + JSON.stringify(message, null, 2));
            var msg = {};
            msg.payload = message;
            node.send(msg);
          });
        //} else {
        //  node.status({ fill: "red", shape: "dot", text: "Event Nothing" });
        //  node.error("a");
        //}
      }
    });


    //var targetService = new jsforce[node.service]();

    node.on("input", function (msg) {
      //node.status({ fill: "blue", shape: "dot", text: "Processing..." });
      /*
      targetService[node.method](msg.payload, function (err, data) {
        if (err) {
          node.status({ fill: "red", shape: "dot", text: "error" });
          node.error("failed: " + err.toString(), msg);
          msg.err = err;
          msg.params = msg.payload;
          msg.payload = {};
          node.send(msg);
        } else {
          node.status({});
          msg.err = {};
          msg.params = msg.payload;

          var toString = Object.prototype.toString
          console.log(toString.call(data));

          msg.payload = data;
          node.send(msg);
        }
      });
      */
      
    });
  }
  RED.nodes.registerType("salesforce-platform-event-sub", SalesforcePlatformEvent);
};
