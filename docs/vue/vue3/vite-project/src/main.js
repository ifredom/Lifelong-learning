import { createApp } from "vue";
import App from "./App.vue";
import "./proxy";
createApp(App).mount("#app");

function Tree(name) {
  this.name = name;
}
