import { Activity } from "@/types";
import { Commit } from "vuex";
import { getActivities, getActivity } from "@/api/activity";

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
  loadingActivities: true,
  loadingActivity: true,
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
  fetchActivities: async ({ commit }: { commit: Commit }) => {
    state.loadingActivities = true;
    const activities = await getActivities({ email: "aanggaadc@gmail.com" });
    commit("setActivities", activities);
    state.loadingActivities = false;
  },
  fetchActivity: async ({ commit }: { commit: Commit }, id: number) => {
    state.loadingActivity = true;
    const activity = await getActivity(id);
    commit("setActivity", activity);
    state.loadingActivity = false;
  },
};

const mutations = {
  setActivities: (state: ActivityState, activities: Activity[]) => {
    state.activities = activities;
    state.loadingActivities = false;
  },
  setActivity: (state: ActivityState, activity: Activity) => {
    state.activity = activity;
    state.loadingActivity = false;
  },
  setSelectedActivity: (state: ActivityState, activity: Activity) => {
    state.selectedActivity = activity;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
