import {
	ArrowDropDown,
	ArrowDropUp,
	ThumbDown,
	ThumbUp,
} from '@mui/icons-material';
import { Button, ButtonGroup } from '@mui/material';

export interface UpDownVoterProps {
	upVoteCount: number;
	downVoteCount: number;
}

export default function UpDownVoter({
	upVoteCount,
	downVoteCount,
}: UpDownVoterProps) {
	return (
		<ButtonGroup variant="text" orientation="vertical">
			<Button startIcon={<ArrowDropUp />}>{upVoteCount}</Button>
			<Button startIcon={<ArrowDropDown />}>{downVoteCount}</Button>
		</ButtonGroup>
	);
}
