import { createSlice } from '@reduxjs/toolkit';
import { User } from '../../types';

interface UserState {
	loading: boolean;
	success: boolean;
	userInfo?: User;
	userToken?: string;
}

const initialState: UserState = {
	loading: false,
	success: false,
};

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {},
});

export default userSlice.reducer;
