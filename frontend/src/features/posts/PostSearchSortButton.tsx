import { ArrowDownward, ArrowUpward } from '@mui/icons-material';
import { Button, Menu, MenuItem } from '@mui/material';
import _ from 'lodash';
import { MouseEvent, useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { SortByTerm } from '../../types/post';
import { selectSortTerm, setSortTerm } from './postsSlice';

/**
 * Button with a menu to choose a ForumPost property to sort by.
 * @returns Button, Menu.
 */
export default function PostSearchSortButton() {
	const dispatch = useAppDispatch();
	const sortTerm = useAppSelector(selectSortTerm);
	const [anchor, setAnchor] = useState<HTMLElement | null>();

	const open = useMemo(() => !!anchor, [anchor]);

	const terms: SortByTerm[] = ['timestamp', 'title', 'user'];

	const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
		setAnchor(event.currentTarget);
	};

	const handleClose = () => {
		setAnchor(null);
	};

	const handleSort = (sortBy: SortByTerm) => () => {
		dispatch(
			setSortTerm({
				term: sortBy,
				ascending:
					sortBy === sortTerm.term ? !sortTerm.ascending : sortTerm.ascending,
			}),
		);
		setAnchor(null);
	};

	return (
		<>
			<Button
				onClick={handleClick}
				endIcon={sortTerm.ascending ? <ArrowUpward /> : <ArrowDownward />}>
				{sortTerm.term}
			</Button>
			<Menu anchorEl={anchor} open={open} onClose={handleClose}>
				{terms.map((term, index) => (
					<MenuItem key={index} onClick={handleSort(term)}>
						{_.upperFirst(term)}
					</MenuItem>
				))}
			</Menu>
		</>
	);
}
