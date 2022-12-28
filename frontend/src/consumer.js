import { createConsumer } from "@rails/actioncable"; //function that host the Action Cable server 

let wsUrl; //the url need for createConsumer inorder to host the Action Cable server 
if (process.env.NODE_ENV !== "production") {
    wsUrl = "ws://localhost:5000/cable";
} else {
    wsUrl = "/cable";
}

export default createConsumer(wsUrl); 