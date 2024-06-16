import { Activity } from "@/types";
import { ActionContext } from "vuex";
import { RootState } from "..";
import { getActivities, getActivity, deleteActivity } from "@/api/activity";

export interface ActivityState {
  activities: Activity[];
  loadingActivities: boolean;
  activity: Activity | null;
  loadingActivity: boolean;
  selectedActivity: Activity | null;
}

const state: ActivityState = {
  activities: [],
  activity: null,
  loadingActivities: false,
  loadingActivity: false,
  selectedActivity: null,
};

const getters = {
  activities: (state: ActivityState) => state.activities,
  activity: (state: ActivityState) => state.activity,
  selectedActivity: (state: ActivityState) => state.selectedActivity,
  loadingActivities: (state: ActivityState) => state.loadingActivities,
  loadingActivity: (state: ActivityState) => state.loadingActivity,
};

const actions = {
  async fetchActivities({ commit }: ActionContext<ActivityState, RootState>) {
    commit("setLoadingActivities", true);
    try {
      const activities = await getActivities({ email: "aanggaadc@gmail.com" });
      commit("setActivities", activities);
    } catch (error) {
      console.error("Failed to fetch activities:", error);
    } finally {
      commit("setLoadingActivities", false);
    }
  },
  async fetchActivity(
    { commit }: ActionContext<ActivityState, RootState>,
    id: number
  ) {
    commit("setLoadingActivity", true);
    try {
      const activity = await getActivity(id);
      commit("setActivity", activity);
    } catch (error) {
      console.error("Failed to fetch activity:", error);
    } finally {
      commit("setLoadingActivity", false);
    }
  },
  async deleteActivityAction(
    { commit }: ActionContext<ActivityState, RootState>,
    id: number
  ) {
    try {
      await deleteActivity(id);
      commit("filterActivity", id);
    } catch (error) {
      console.error("Failed to delete activity:", error);
    }
  },
  selectActivity(
    { commit }: ActionContext<ActivityState, RootState>,
    activity: Activity
  ) {
    commit("setSelectedActivity", activity);
  },
};

const mutations = {
  setActivities(state: ActivityState, activities: Activity[]) {
    state.activities = activities;
  },
  setActivity(state: ActivityState, activity: Activity) {
    state.activity = activity;
  },
  setSelectedActivity(state: ActivityState, activity: Activity) {
    state.selectedActivity = activity;
  },
  filterActivity(state: ActivityState, id: number) {
    state.activities = state.activities.filter(
      (activity) => activity.id !== id
    );
  },
  setLoadingActivities(state: ActivityState, isLoading: boolean) {
    state.loadingActivities = isLoading;
  },
  setLoadingActivity(state: ActivityState, isLoading: boolean) {
    state.loadingActivity = isLoading;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
