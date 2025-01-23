import * as signalR from "@microsoft/signalr";

const connection = new signalR.HubConnectionBuilder()
  .withUrl("https://localhost:44376/notificationHub")
  .withAutomaticReconnect()
  .build();

connection.start().catch((err) => console.error("SignalR Connection Error:", err));

export default connection;