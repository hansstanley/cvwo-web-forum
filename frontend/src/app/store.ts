import { configureStore } from '@reduxjs/toolkit';
import commentsReducer from '../features/comments/commentsSlice';
import postsReducer from '../features/posts/postsSlice';
import userReducer from '../features/user/userSlice';

const store = configureStore({
	reducer: {
		comments: commentsReducer,
		posts: postsReducer,
		user: userReducer,
	},
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
