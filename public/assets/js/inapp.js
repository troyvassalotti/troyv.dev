/** @format */

import InAppSpy from "inapp-spy";

const {isInApp} = InAppSpy();

if (isInApp) {
	const intentURL = `intent:${window.location.href}#Intent;end`;
	window.location.replace(intentURL);

	const $div = document.createElement("div");
	$div.innerHTML = `<p><a href="${intentURL}">Open this page</a> in your default browser.</p>`;
	document.body.appendChild($div);
}
