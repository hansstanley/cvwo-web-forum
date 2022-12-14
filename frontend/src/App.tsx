import React, { useEffect, useMemo } from 'react';
import logo from './logo.svg';
import './App.css';
import {
	Box,
	createTheme,
	CssBaseline,
	ThemeProvider,
	Toolbar,
	useMediaQuery,
} from '@mui/material';
import { MainAppBar, MainFrame } from './components';
import { PostAddFab } from './features/posts';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { setMobile } from './features/theme/themeSlice';
import { setAuth } from './app/utils';
import { initAuth } from './features/user/userSlice';
import { fetchUserByUsername } from './features/user/userApi';

function App() {
	const dispatch = useAppDispatch();
	const { mode } = useAppSelector((state) => state.theme);
	const { auth, status } = useAppSelector((state) => state.user);

	const theme = useMemo(() => createTheme({ palette: { mode } }), [mode]);

	const mobile = useMediaQuery(theme.breakpoints.down('md'));
	useEffect(() => {
		dispatch(setMobile(mobile));
	}, [dispatch, mobile]);

	useEffect(() => {
		if (auth) {
			setAuth(auth);
			dispatch(fetchUserByUsername(auth.username));
		}
	}, [dispatch, auth]);

	useEffect(() => {
		if (status.status === 'idle') {
			dispatch(initAuth());
		}
	}, [dispatch, status]);

	return (
		<ThemeProvider theme={theme}>
			<Box sx={{ display: 'flex' }}>
				<CssBaseline />
				<MainAppBar />
				<MainFrame />
				<PostAddFab />
			</Box>
		</ThemeProvider>
	);
}

export default App;
