import { ArrowDropDown, ArrowDropUp } from '@mui/icons-material';
import { Button, ButtonGroup } from '@mui/material';

export interface UpDownVoterProps {
	upVoteCount: number;
	downVoteCount: number;
}

/**
 * Button group with upvote and downvote buttons.
 * @param param0 Props.
 * @returns ButtonGroup.
 */
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
