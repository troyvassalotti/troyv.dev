/** @format */

import {css} from "lit";

export default css`
	:host {
		box-sizing: border-box;
	}

	*,
	*::after,
	*::before {
		box-sizing: inherit;
	}

	*:not(dialog) {
		margin: 0;
	}

	.flow > * + * {
		margin-block-start: var(--flow-space, 1em);
	}
`;
