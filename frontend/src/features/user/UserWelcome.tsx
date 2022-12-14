import { Typography } from '@mui/material';
import { useAppSelector } from '../../app/hooks';
import { selectLoginSuccess } from './userSlice';

export default function UserWelcome() {
	const success = useAppSelector(selectLoginSuccess);
	const { userInfo } = useAppSelector((state) => state.user);

	return success ? (
		<Typography fontWeight="bold" sx={{ mr: 1 }}>
			{userInfo?.username ?? 'Somebody'}
		</Typography>
	) : null;
}
