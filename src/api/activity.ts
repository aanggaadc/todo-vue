import fetcher from "./base";
import { GeneralQueryResponse, Activity } from "@/types";

export const getActivities = async (params: {
  email: string;
}): Promise<Activity[]> => {
  const response = await fetcher<GeneralQueryResponse<Activity[]>>(
    "activity-groups",
    params
  );

  return response.data;
};

export const getActivity = async (id: number): Promise<Activity> => {
  const response = await fetcher<Activity>(`activity-groups/${id}`);

  return response;
};

export const createActivity = async (params: {
  email: string;
  title: string;
}): Promise<Activity> => {
  const response = await fetcher<Activity>("activity-groups", params, {
    method: "POST",
  });

  return response;
};

export const updateActivity = async (params: {
  id: number;
  title: string;
}): Promise<Activity> => {
  const { id, ...payload } = params;
  const response = await fetcher<Activity>(`activity-groups/${id}`, payload, {
    method: "PATCH",
  });

  return response;
};

export const deleteActivity = async (id: number): Promise<Activity> => {
  const response = await fetcher<Activity>(`activity-groups/${id}`, "", {
    method: "DELETE",
  });

  return response;
};
