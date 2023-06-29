
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface User {
  userName: string;
  email: string;
  password: string;
}

interface pay{
  is_verified:number | string,
  jwt:string,
  userName:string

}
interface UserState {
  users: User[];
  payl: pay | null;
  errorLogin: string | null | undefined;
  errorRegister: string | null | undefined;
  status: "idle" | "loading" | "success" | "error";
}

const initialState: UserState = {
  users: [],
  payl: null,
  errorLogin: null,
  errorRegister: null,
  status: "idle",
};

export const getUsers = createAsyncThunk("users/getUsers", async () => {
  const res = await fetch("http://localhost:5000/users");
  const json = res.json();
  return json;
});

export const register = createAsyncThunk(
    "users/register",
    async ({ user }: { user: User }) => {
      try {
        const res = await fetch("http://localhost:5000/register", {
          method: "POST",
          body: JSON.stringify(user),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        });
        if (res.ok) {
          const json = await res.json();
          return json;
        } else {
          const errorMsg = await res.json();
          throw new Error(errorMsg.error);
        }
      } catch (err: any) {
        console.log(err, 'err');
        throw new Error(err);
      }
    }
  );
  

export interface LoginPayload {
  email: string;
  password: string;
}

export const login = createAsyncThunk(
  "users/login",
  async ({ user }: { user: LoginPayload }) => {
    try {
      const res = await fetch("http://localhost:5000/login", {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });

      const status = res.status;
      const json = await res.json();

      if (status === 200) {
        return json;
      } else {
        throw new Error(json);
      }
    } catch (err: any) {
      throw new Error(err);
    }
  }
);

  
const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.fulfilled, (state, action) => {
        state.status = "success";
        state.users = action.payload;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.status = "success";
        state.errorRegister = null;
        state.users.push(action.payload);
        state.users = action.payload
        console.log(action.payload,'reg');
      }).addCase(register.rejected, (state, action) => {
        state.status = "error";
        state.errorRegister = action.error.message ;
      })
      .addCase(login.fulfilled, (state, { payload }) => {
        state.status = "success";
          state.payl = payload;
          state.errorLogin = null;  
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "error";
        state.errorLogin = action.error.message;
      });
  },
});

export default usersSlice.reducer;



