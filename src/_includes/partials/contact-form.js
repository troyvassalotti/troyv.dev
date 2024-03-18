/** @format */

const {html} = require("common-tags");

module.exports = function () {
	return html`
		<style>
			.contactForm {
				color-scheme: light dark;
				margin-block: 2rem;
				max-inline-size: 40rem;

				.contactForm__set {
					display: flex;
					flex-direction: column;
					gap: 0.5rem;
				}

				.requiredField {
					color: red;
				}
			}
		</style>

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
};
