import { DarkMode, LightMode } from '@mui/icons-material';
import { IconButton, Tooltip } from '@mui/material';
import { useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { toggleMode } from './themeSlice';

export default function ThemeToggle() {
	const dispatch = useAppDispatch();
	const { mode } = useAppSelector((state) => state.theme);

	const isLight = useMemo(() => mode === 'light', [mode]);

	const handleToggle = () => {
		dispatch(toggleMode(isLight ? 'dark' : 'light'));
	};

	return (
		<Tooltip title={`Toggle ${isLight ? 'dark' : 'light'} mode`}>
			<IconButton onClick={handleToggle} color="inherit">
				{isLight ? <DarkMode /> : <LightMode />}
			</IconButton>
		</Tooltip>
	);
}
