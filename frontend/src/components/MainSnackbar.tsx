import {
	Alert,
	Button,
	Slide,
	SlideProps,
	Snackbar,
	Stack,
} from '@mui/material';
import { Fragment, SyntheticEvent, useEffect, useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
	popSnack,
	selectSnacks,
	selectTopSnack,
} from '../features/snacks/snacksSlice';

export default function MainSnackbar() {
	const dispatch = useAppDispatch();
	const topSnack = useAppSelector(selectTopSnack);
	const snacks = useAppSelector(selectSnacks);
	const [open, setOpen] = useState(false);

	useEffect(() => {
		if (topSnack) {
			setOpen(true);
		}
	}, [topSnack]);

	const handleClose = (event: SyntheticEvent | Event, reason?: string) => {
		if (reason === 'clickaway') return;
		setOpen(false);
	};

	const handleExited = () => {
		dispatch(popSnack());
	};

	return (
		<Snackbar
			open={open}
			autoHideDuration={6000}
			anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
			onClose={handleClose}
			TransitionComponent={SlideTransition}
			TransitionProps={{ onExited: handleExited }}>
			<Alert
				onClose={handleClose}
				variant="filled"
				severity={topSnack?.severity}
				action={
					snacks.length > 1 ? (
						<Button
							color="inherit"
							variant="outlined"
							size="small"
							onClick={handleClose}>
							{`${snacks.length - 1} more`}
						</Button>
					) : undefined
				}>
				{topSnack?.message}
			</Alert>
		</Snackbar>
	);
}

function SlideTransition(props: SlideProps) {
	return <Slide {...props} direction="down" />;
}
