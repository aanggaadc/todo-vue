import { createStore } from "vuex";
import activity from "./module/activity";

export default createStore({
  modules: {
    activity,
  },
});
