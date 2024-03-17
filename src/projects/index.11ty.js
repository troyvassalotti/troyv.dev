/** @format */

const {html} = require("common-tags");
const {Icon} = require("../_includes/partials/index.js");

class Projects {
	data() {
		return {
			layout: "base",
			title: "Projects",
			description: "Stuff I've Made",
		};
	}

	/**
	 * Generate HTML list of projects data.
	 * @param {Project[]} projects Set of projects defined in the site.
	 * @returns
	 */
	createProjectsList(projects) {
		return projects
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
			.join("");
	}

	render({title, projects}) {
		return html`
			<header class="masthead masthead--small">
				<h1>${title}</h1>
			</header>
			<ul
				role="list"
				class="flow">
				${this.createProjectsList(projects)}
			</ul>
		`;
	}
}

module.exports = Projects;
