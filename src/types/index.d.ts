interface Activity {
  created_at: Date;
  updated_at: Date;
  deleted_at?: Date | null;
  email: string;
  id: number;
  title: string;
  todo_items: Todo[];
}

interface Todo {
  id: number;
  activity_group_id: string;
  title: string;
  is_active: boolean;
  priority: string;
  created_at: Date;
  updated_at: Date;
  deleted_at: Data | null;
}

interface GeneralQueryResponse<T> {
  data: T;
  total: number;
  skip: number;
  limit: number;
}

interface GeneralMutateResponse<T> {
  status: string;
  message: string;
  data: T;
}

export { Activity, Todo, GeneralQueryResponse, GeneralMutateResponse };
