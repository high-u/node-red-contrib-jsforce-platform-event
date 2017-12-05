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
        node.status({ fill: "blue", shape: "dot", text: "Connected" });
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

      
      //conn.sobject(node.eventname).create({ deviceId__c: "xxxxxx1" }, function (err, ret) {
      conn.sobject(node.eventname).create(msg.payload, function (err, ret) {  
        //console.log(ret);
        if (err || !ret.success) {
          msg.error = err;
          msg.return = ret;
          node.send(msg);
        } else {
          //test
          //msg.payload = {};
          //msg.payload.un = node.username;
          //msg.payload.pw = node.password;
          //msg.payload.en = node.eventname;
          //msg.payload.mn = node.methodname;
          msg.payload = ret;
          node.send(msg);
        }
      });
    });
  }
  RED.nodes.registerType("salesforce-platform-event-pub", SalesforcePlatformEvent);
};
