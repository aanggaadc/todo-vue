import { Todo } from "@/types";
import { ActionContext } from "vuex";
import { RootState } from "..";
import {
  getTodos as getTodosApi,
  createTodo as createTodoApi,
  updateTodo as updateTodoApi,
  deleteTodo as deleteTodoApi,
} from "@/api/todo";

export interface TodoState {
  todos: Todo[];
  todo: Todo | null;
  loadingTodos: boolean;
  loadingTodo: boolean;
}

const state: TodoState = {
  todos: [],
  todo: null,
  loadingTodos: true,
  loadingTodo: true,
};

const getters = {
  todos: (state: TodoState) => state.todos,
  todo: (state: TodoState) => state.todo,
  loadingTodos: (state: TodoState) => state.loadingTodos,
  loadingTodo: (state: TodoState) => state.loadingTodo,
};

const actions = {
  async getTodos({ commit }: ActionContext<TodoState, RootState>, id: string) {
    commit("setLoadingTodos", true);
    try {
      const todos = await getTodosApi({
        activity_group_id: id,
      });
      commit("setTodos", todos);
    } catch (error) {
      console.error("Failed to fetch todo:", error);
    } finally {
      commit("setLoadingTodos", false);
    }
  },
  selectTodo(
    { commit }: ActionContext<TodoState, RootState>,
    todo: Todo | null
  ) {
    commit("setSelectedTodo", todo);
  },
  async createTodo(
    { commit }: ActionContext<TodoState, RootState>,
    params: { activity_group_id: string; priority: string; title: string }
  ) {
    try {
      const newTodo = await createTodoApi(params);
      commit("addTodo", newTodo);
    } catch (error) {
      console.error("Failed to create activity:", error);
    }
  },
  async updateTodo(
    { commit }: ActionContext<TodoState, RootState>,
    params: {
      id: number;
      is_active: boolean;
      priority?: string | undefined;
      title?: string | undefined;
    }
  ) {
    try {
      const updatedTodo = await updateTodoApi(params);
      commit("updateTodos", updatedTodo);
    } catch (error) {
      console.error("Failed to update activity:", error);
    }
  },
  async deleteTodo(
    { commit }: ActionContext<TodoState, RootState>,
    id: number
  ) {
    try {
      await deleteTodoApi(id);
      commit("deleteTodo", id);
    } catch (error) {
      console.error("Failed to delete activity:", error);
    }
  },
};

const mutations = {
  setTodos(state: TodoState, todos: Todo[]) {
    state.todos = todos;
  },
  setSelectedTodo(state: TodoState, todo: Todo | null) {
    state.todo = todo;
  },
  addTodo(state: TodoState, todo: Todo) {
    state.todos = [todo, ...state.todos];
  },
  updateTodos(state: TodoState, todo: Todo) {
    state.todos = state.todos.map((t) =>
      t.id === todo.id ? { ...t, ...todo } : t
    );
  },
  deleteTodo(state: TodoState, id: number) {
    state.todos = state.todos.filter((todo) => todo.id !== id);
  },
  setLoadingTodos(state: TodoState, isLoading: boolean) {
    state.loadingTodos = isLoading;
  },
  setLoadingTodo(state: TodoState, isLoading: boolean) {
    state.loadingTodo = isLoading;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
