import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface User {
    userName:string;
    email:string;
    password:string
}
interface UserState {
    users:User[],
    error:null | string,
    status:  "idle" | "loading" | "success" | "error";
}

const initialState:UserState = {
    users: [],
    error: null,
    status: "idle",
}

export const fetchUsers = createAsyncThunk('users/fetchUsers', async()=>{
    const res = await fetch('http://localhost:5000/users');
    const json = res.json();
    return json;
})

export const register = createAsyncThunk('users/register', async({user}:{user:User})=>{
    try{
        const res = await fetch('http://localhost:5000/register',{
            method:'POST',
            body: JSON.stringify(user),
            headers:{
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        return res.json()
    }catch(err){
        console.log(err);
    }
})
export interface LoginPayload {
    email: string;
    password: string;
  }
export const login = createAsyncThunk('users/login', async({user}:{user:LoginPayload})=>{
    try{
        const res = await fetch('http://localhost:5000/login',{
            method:'POST',
            body: JSON.stringify(user),
            headers:{
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        return  res.json()
    }catch(err){
        console.log(err);
    }
})

const usersSlice = createSlice({
    name:'users',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(fetchUsers.fulfilled, (state, action)=>{
            state.status = 'success';
            state.users = action.payload;
        }).addCase(register.fulfilled, (state, action)=>{
            state.status = 'success',
            state.users.push(action.payload.user);
        }).addCase(login.fulfilled, (state, action)=>{
            state.status = 'success';
            localStorage.setItem('user', JSON.stringify(action.payload))
        })
    }
})

export default usersSlice.reducer;
