import { createAsyncThunk } from "@reduxjs/toolkit";
import connection from "../../config/connection";
import { LoginState } from "../../utils";

export const loadUsers = createAsyncThunk(
  "user/load",
  async (_, { rejectWithValue }) => {
    try {
      const response = await connection.get(`/users`);
      const { status, data } = response;

      if (status !== 200) {
        return ["data not found"];
      }

      return {
        data: Object.values(data),
        status: status,
      };
    } catch (e: any) {
      return rejectWithValue(e.response.data);
    }
  }
);

export const loadUserId = createAsyncThunk(
  "user/user-id",
  async ({ user_id }: LoginState, { rejectWithValue }) => {
    try {
      const response = await connection.get(`/users?id=${user_id}`);
      const { status, data } = response;

      if (status !== 200) {
        return ["data not foundƒ"];
      }

      return {
        data: data,
        nama: data.name,
        status: status,
      };
    } catch (e: any) {
      return rejectWithValue(e.response.data);
    }
  }
);
