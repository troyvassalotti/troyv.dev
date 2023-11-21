/** @format */

const {html} = require("common-tags");

module.exports = function () {
	return html`
		<style>
			.c-contactForm {
				color-scheme: light dark;
				margin-block: 2rem;
				max-inline-size: 40rem;
			}

			.c-contactForm__set {
				display: flex;
				flex-direction: column;
				gap: 0.5rem;
			}

			.requiredField {
				color: red;
			}

			button[type="submit"] {
				padding-block: var(--space-2xs);
				padding-inline: 1ch;
			}
		</style>

		<form
			class="c-contactForm flow"
			name="contactForm"
			netlify
			netlify-honeypot="bot-field"
			action="/success">
			<label style="display: none">
				Don't fill this out:
				<input name="bot-field" />
			</label>
			<div class="c-contactForm__set">
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
			<div class="c-contactForm__set">
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
			<div class="c-contactForm__set">
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
			<button type="submit">Submit</button>
		</form>
	`;
};
