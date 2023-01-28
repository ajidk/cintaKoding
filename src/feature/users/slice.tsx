import { createSlice } from "@reduxjs/toolkit";
import { loadUserId, loadUsers } from "./actions";

export interface AccountState {
  users: any;
  user: any;
  loading: boolean;
  error: boolean;
}

const initialState: AccountState = {
  users: [],
  user: {},
  loading: false,
  error: false,
};

export const userSlice = createSlice({
  name: "users",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loadUsers.fulfilled, (state, action) => {
      state.users = action.payload;
    });
    builder.addCase(loadUsers.pending, (state, action) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(loadUsers.rejected, (state, action) => {
      state.loading = false;
      state.error = true;
    });
    builder.addCase(loadUserId.fulfilled, (state, action) => {
      state.user = action.payload;
    });
    builder.addCase(loadUserId.pending, (state, action) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(loadUserId.rejected, (state, action) => {
      state.loading = false;
      state.error = true;
    });
  },
});

// export const {setGroupNotifs, setMessageNotifs} = applicationSlice.actions
