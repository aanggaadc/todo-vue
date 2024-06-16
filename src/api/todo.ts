import fetcher from "./base";
import { GeneralQueryResponse, Todo } from "@/types";

export const getTodos = async (params: {
  activity_group_id: string;
}): Promise<Todo[]> => {
  const response = await fetcher<GeneralQueryResponse<Todo[]>>(
    "/todo-items",
    params
  );

  return response.data;
};

export const createTodo = async (params: {
  activity_group_id: string;
  priority: string;
  title: string;
}): Promise<Todo> => {
  const response = await fetcher<Todo>("/todo-items", params, {
    method: "POST",
  });

  return response;
};

export const updateTodo = async (params: {
  id: number;
  is_active: boolean;
  priority?: string;
  title?: string;
}): Promise<Todo> => {
  const { id, ...payload } = params;
  const response = await fetcher<Todo>(`/todo-items/${id}`, payload, {
    method: "PUT",
  });

  return response;
};

export const deleteTodo = async (id: number): Promise<Todo> => {
  const response = await fetcher<Todo>(`/todo-items/${id}`, "", {
    method: "DELETE",
  });

  return response;
};
