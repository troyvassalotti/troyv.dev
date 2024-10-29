/** @format */

import _GlitchText from "glitch-text";
import _CheatCode from "cheatcode";
import _LiteYoutube from "lite-youtube";
import ModalMenu from "modal-menu";
import TheClub from "the-club";
import CoolTable from "cool-table";
import CoolLink from "cool-link";
import CoolSeparator from "cool-separator";

ModalMenu.register();
TheClub.register();
CoolTable.register();
CoolLink.register();
CoolSeparator.register();

document.documentElement.classList.remove("no-js");

if (!document.getElementById("main")) {
	console.error(
		"No element with ID of 'main' found. Add that in or the skip link won't work.",
	);
}
