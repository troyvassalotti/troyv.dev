/** @format */

const {html} = require("common-tags");
const {Icon} = require("../_includes/partials/index.js");

class Projects {
	data() {
		return {
			layout: "base.11ty.js",
			glitch: true,
			outputDescription: true,
			noHeaderContainment: true,
			title: "Projects",
			description:
				"A non-exhaustive list of things I've made ranging from little tools to bonafide apps.",
		};
	}

	render({projects}) {
		return html`
			<ul
				role="list"
				class="flow">
				${projects
					.toReversed()
					.map(({url, description, name, repository}) => {
						return html`
							<li>
								<p class="u-font--headings u-step-3 u-text--bold">
									${url ? html`<a href="${url}">${name}</a>` : html`${name}`}
								</p>
								<p>${description}</p>
								${repository
									? html`<p>
											<a
												class="c-link--icon"
												href="${repository}"
												>${Icon("github")}${repository.replace(
													"https://github.com/",
													"",
												)}</a
											>
										</p>`
									: ""}
							</li>
						`;
					})
					.join("")}
			</ul>
		`;
	}
}

module.exports = Projects;
