module.exports = function (RED) {
  function RemoteServerNode(n) {
    RED.nodes.createNode(this, n);
    this.url = this.credentials.url;
    this.username = this.credentials.username;
    this.password = this.credentials.password;
    this.name = n.name;
  }
  RED.nodes.registerType("salesforce-platform-event-config", RemoteServerNode, {
    credentials: {
      url: { type: "text" },
      username: { type: "text" },
      password: { type: "text" }
    }
  });
}