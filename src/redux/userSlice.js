import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        users: []
    },
    reducers: {
        getUser: (state, action) => {
            state.users = action.payload.map((user) => {
                return { id: user._id, name: user.name, profession: user.profession }
            })
        },
        addUser: (state, action) => {
            state.users.push(action.payload)
        },
        updateData: (state, action) => {
            const index = state.users.findIndex((x) => x.id === action.payload.id);
            state.users[index] = {
                id: action.payload.id,
                name: action.payload.name,
                profession: action.payload.profession
            }
        },
        deleteData: (state, action) => {
            const id = action.payload.id
            state.users = state.users.filter((u) => u.id !== id);
        }
    }
})

export const { getUser, addUser, updateData, deleteData } = userSlice.actions;
export default userSlice.reducer;