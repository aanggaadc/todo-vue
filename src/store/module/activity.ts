import { Activity } from "@/types";
import { ActionContext } from "vuex";
import { RootState } from "..";
import {
  getActivities as getActivitiesApi,
  getActivity as getActivityApi,
  createActivity as createActivityApi,
  updateActivity as updateActivityApi,
  deleteActivity as deleteActivityApi,
} from "@/api/activity";

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
  async getActivities({ commit }: ActionContext<ActivityState, RootState>) {
    commit("setLoadingActivities", true);
    try {
      const activities = await getActivitiesApi({
        email: "aanggaadc@gmail.com",
      });
      commit("setActivities", activities);
    } catch (error) {
      console.error("Failed to fetch activities:", error);
    } finally {
      commit("setLoadingActivities", false);
    }
  },
  async getActivity(
    { commit }: ActionContext<ActivityState, RootState>,
    id: number
  ) {
    commit("setLoadingActivity", true);
    try {
      const response = await getActivityApi(id);
      const activity = {
        created_at: response.created_at,
        id: response.id,
        title: response.title,
      };
      commit("setActivity", activity);
    } catch (error) {
      console.error("Failed to fetch activity:", error);
    } finally {
      commit("setLoadingActivity", false);
    }
  },
  async createActivity(
    { commit }: ActionContext<ActivityState, RootState>,
    params: { email: string; title: string }
  ) {
    try {
      const newActivity = await createActivityApi(params);
      commit("addActivity", newActivity);
    } catch (error) {
      console.error("Failed to create activity:", error);
    }
  },
  async updateActivity(
    { commit }: ActionContext<ActivityState, RootState>,
    params: { id: number; title: string }
  ) {
    try {
      const updatedActivity = await updateActivityApi(params);
      commit("setActivity", updatedActivity);
    } catch (error) {
      console.error("Failed to update activity:", error);
    }
  },
  async deleteActivity(
    { commit }: ActionContext<ActivityState, RootState>,
    id: number
  ) {
    try {
      await deleteActivityApi(id);
      commit("deleteActivity", id);
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
  addActivity(state: ActivityState, activity: Activity) {
    state.activities = [activity, ...state.activities];
  },
  setSelectedActivity(state: ActivityState, activity: Activity) {
    state.selectedActivity = activity;
  },
  deleteActivity(state: ActivityState, id: number) {
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
