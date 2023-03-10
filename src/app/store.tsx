import { configureStore } from "@reduxjs/toolkit";
import { postSlice } from "../feature/posts/slice";
import { userSlice } from "../feature/users/slice";

export const store = configureStore({
  reducer: {
    users: userSlice.reducer,
    posts: postSlice.reducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
