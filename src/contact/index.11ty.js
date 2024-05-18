/** @format */

import {html} from "common-tags";

export function data() {
	return {
		layout: "base.11ty.js",
		glitch: true,
		title: "Contact",
		truncate: true,
	};
}

export function render() {
	return html`
		<p>
			The best way to reach me is likely through this form. Submissions here get
			filtered to my inbox in a far more efficient way than you cold emailing me
			ever would (and it won't go into spam, unless you are in fact sending me
			spam).
		</p>
		<p>
			If you're looking for my resume, you can
			<a href="https://resume.troyv.dev/">find that here</a>.
		</p>
		<form
			class="contactForm flow"
			name="contactForm"
			netlify
			netlify-honeypot="bot-field"
			action="/success">
			<label style="display: none">
				Don't fill this out:
				<input name="bot-field" />
			</label>
			<div class="contactForm__set">
				<label for="name">
					Name<sup
						aria-hidden="true"
						class="requiredField"
						>*</sup
					>
				</label>
				<input
					name="name"
					type="text"
					id="name"
					required />
			</div>
			<div class="contactForm__set">
				<label for="email">
					Email<sup
						aria-hidden="true"
						class="requiredField"
						>*</sup
					>
				</label>
				<input
					name="email"
					type="email"
					id="email"
					required />
			</div>
			<div class="contactForm__set">
				<label for="message">
					Message<sup
						aria-hidden="true"
						class="requiredField"
						>*</sup
					>
				</label>
				<textarea
					name="message"
					id="message"
					required
					placeholder="Say hi!"
					rows="5"></textarea>
			</div>
			<button
				class="button"
				type="submit">
				Submit
			</button>
		</form>
	`;
}
