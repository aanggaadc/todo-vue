import { createStore } from "vuex";
import activity, { ActivityState } from "./module/activity";

export interface RootState {
  activity: ActivityState;
}

export default createStore<RootState>({
  modules: {
    activity,
  },
});
