import { configureStore } from '@reduxjs/toolkit';
import commentsReducer from '../features/comments/commentsSlice';
import postsReducer from '../features/posts/postsSlice';
import themeReducer from '../features/theme/themeSlice';
import userReducer from '../features/user/userSlice';

const store = configureStore({
	reducer: {
		comments: commentsReducer,
		posts: postsReducer,
		theme: themeReducer,
		user: userReducer,
	},
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
