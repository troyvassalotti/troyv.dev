/** @format */

const {html} = require("common-tags");
const {ContactForm} = require("../_includes/partials/index.js");

class Contact {
	data() {
		return {
			layout: "base",
			title: "Contact",
			templateEngineOverride: "md,11ty.js",
		};
	}

	// prettier-ignore
	render({title}) {
		return html`
			# ${title}
			
			The best way to reach me is likely through this form.
			Submissions here get filtered to my inbox in a far more efficient way than
			you cold emailing me ever would (and it won't go into spam, unless you are
			in fact sending me spam).
			
			${ContactForm()}
		`;
	}
}

module.exports = Contact;
