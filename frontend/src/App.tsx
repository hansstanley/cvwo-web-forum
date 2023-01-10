import { useEffect, useMemo } from 'react';
import './App.css';
import {
	Box,
	createTheme,
	CssBaseline,
	ThemeProvider,
	useMediaQuery,
} from '@mui/material';
import { MainAppBar, MainFrame, MainSnackbar } from './components';
import { PostAddFab } from './features/posts';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { setMobile } from './features/theme/themeSlice';
import { setAuth } from './app/utils';
import { fetchUserByUsername } from './features/user/userApi';
import { initAuth, selectAuth } from './features/auth/authSlice';
import { pushSnack } from './features/snacks/snacksSlice';
import { Helmet } from 'react-helmet';

function App() {
	const dispatch = useAppDispatch();
	const auth = useAppSelector(selectAuth);
	const { mode } = useAppSelector((state) => state.theme);
	const { status } = useAppSelector((state) => state.user);

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
		} else if (status.status === 'success') {
			dispatch(
				pushSnack({
					message: "You're in, happy gossiping!",
					severity: 'success',
				}),
			);
		}
		if (status.errorMessage) {
			dispatch(pushSnack({ message: status.errorMessage, severity: 'error' }));
		}
	}, [dispatch, status]);

	return (
		<ThemeProvider theme={theme}>
			<Helmet>
				<title>Gossip on Rails</title>
			</Helmet>
			<Box sx={{ display: 'flex' }}>
				<CssBaseline />
				<MainAppBar />
				<MainFrame />
				<PostAddFab />
				<MainSnackbar />
			</Box>
		</ThemeProvider>
	);
}

export default App;
