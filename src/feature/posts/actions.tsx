import { createAsyncThunk } from "@reduxjs/toolkit";
import connection from "../../config/connection";
import { PostState } from "../../utils";

export const LoadPost = createAsyncThunk(
  "post/data-post",
  async ({ id, limit }: PostState, { rejectWithValue }) => {
    try {
      const response = await connection.get(
        `/posts/${id ? id : ""}?_start=0&_limit=${limit ? limit : ""}`
      );
      const { status, data } = response;

      if (status !== 200) {
        return ["data not foundƒ"];
      }

      return {
        data: data,
        status: status,
      };
    } catch (e: any) {
      return rejectWithValue(e.response.data);
    }
  }
);

export const LoadPostComment = createAsyncThunk(
  "post/data-comment",
  async ({ id }: PostState, { rejectWithValue }) => {
    try {
      const response = await connection.get(`/posts/${id}/comments`);
      const { status, data } = response;

      if (status !== 200) {
        return ["data not foundƒ"];
      }

      return {
        data: data,
        status: status,
      };
    } catch (e: any) {
      return rejectWithValue(e.response.data);
    }
  }
);
