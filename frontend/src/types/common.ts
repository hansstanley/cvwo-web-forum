export interface AppProps {
	children?: React.ReactNode; // best, accepts everything React can render
	childrenElement?: JSX.Element; // A single React element
	style?: React.CSSProperties; // to pass through style props
	onChange?: React.FormEventHandler<HTMLInputElement>; // form events! the generic parameter is the type of event.target
}

/**
 * State of data fetching.
 */
export type FetchStatus = {
	status: 'idle' | 'loading' | 'success' | 'failure';
	errorMessage?: string;
};
