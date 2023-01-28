import { createSlice } from "@reduxjs/toolkit";
import { LoadPost, LoadPostComment } from "./actions";

export interface AccountState {
  dataPost: any;
  comments: any;
  loading: boolean;
  error: boolean;
}

const initialState: AccountState = {
  dataPost: [],
  comments: [],
  loading: false,
  error: false,
};

export const postSlice = createSlice({
  name: "post",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(LoadPost.fulfilled, (state, action) => {
      state.dataPost = action?.payload;
    });
    builder.addCase(LoadPost.pending, (state, action) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(LoadPost.rejected, (state, action) => {
      state.loading = false;
      state.error = true;
    });
    builder.addCase(LoadPostComment.fulfilled, (state, action) => {
      state.comments = action?.payload;
    });
    builder.addCase(LoadPostComment.pending, (state, action) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(LoadPostComment.rejected, (state, action) => {
      state.loading = false;
      state.error = true;
    });
  },
});

// export const {setGroupNotifs, setMessageNotifs} = applicationSlice.actions
