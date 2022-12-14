import { Tab, Tabs } from '@mui/material';
import { SyntheticEvent, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { FilterTerm } from '../../types/post';
import { selectLoginSuccess } from '../user/userSlice';
import { setFilterTerm } from './postsSlice';

/**
 * Tabs component to select a category of ForumPosts.
 * @returns Tabs.
 */
export default function PostSearchTabs() {
	const dispatch = useAppDispatch();
	const loginSuccess = useAppSelector(selectLoginSuccess);
	const [tab, setTab] = useState(0);

	const handleChange = (event: SyntheticEvent, newTab: number) => {
		const tabTerms: FilterTerm[] = ['all', 'user'];
		dispatch(setFilterTerm(tabTerms[newTab]));
		setTab(newTab);
	};

	return (
		<Tabs variant="fullWidth" value={tab} onChange={handleChange}>
			<Tab label="All posts" />
			<Tab label="My posts" disabled={!loginSuccess} />
		</Tabs>
	);
}
