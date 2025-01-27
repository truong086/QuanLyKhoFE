import * as signalR from "@microsoft/signalr";
import {useCounterStore} from "../../store";

const store = useCounterStore()
const connection = new signalR.HubConnectionBuilder()
  .withUrl("https://localhost:44376/notificationHub", {
    accessTokenFactory: () => store.getToken
  })
  .withAutomaticReconnect()
  .build();

connection.start().catch((err) => console.error("SignalR Connection Error:", err));

export default connection;