import { createStore } from "vuex";
import activity, { ActivityState } from "./module/activity";
import todo, { TodoState } from "./module/todo";

export interface RootState {
  activity: ActivityState;
  todo: TodoState;
}

export default createStore<RootState>({
  modules: {
    activity,
    todo,
  },
});
