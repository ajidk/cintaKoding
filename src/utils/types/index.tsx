export interface LoginState {
  username?: string;
  password?: string;
  user_id?: number;
}

export interface PostState {
  postId?: number;
  id?: number;
  name?: string;
  email?: string;
  body?: string;
  comment?: number;
  limit?: number;
}
