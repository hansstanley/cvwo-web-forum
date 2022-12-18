import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import commentsReducer from '../features/comments/commentsSlice';
import postsReducer from '../features/posts/postsSlice';
import snacksReducer from '../features/snacks/snacksSlice';
import themeReducer from '../features/theme/themeSlice';
import userReducer from '../features/user/userSlice';

const store = configureStore({
	reducer: {
		auth: authReducer,
		comments: commentsReducer,
		posts: postsReducer,
		snacks: snacksReducer,
		theme: themeReducer,
		user: userReducer,
	},
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
