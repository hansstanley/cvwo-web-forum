import { Tab, Tabs } from '@mui/material';
import { SyntheticEvent, useState } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { FilterTerm } from '../../types/post';
import { setFilterTerm } from './postsSlice';

export default function PostSearchTabs() {
	const dispatch = useAppDispatch();
	const [tab, setTab] = useState(0);

	const handleChange = (event: SyntheticEvent, newTab: number) => {
		const tabTerms: FilterTerm[] = ['all', 'user'];
		dispatch(setFilterTerm(tabTerms[newTab]));
		setTab(newTab);
	};

	return (
		<Tabs variant="fullWidth" value={tab} onChange={handleChange}>
			<Tab label="All posts" />
			<Tab label="My posts" />
		</Tabs>
	);
}
