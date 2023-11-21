/** @format */

const {html} = require("common-tags");
const {GitHubIcon} = require("../_includes/partials/index.js");

class Projects {
	data() {
		return {
			layout: "base",
			title: "Projects",
			description: "Stuff I've Made",
		};
	}

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
										>${GitHubIcon()}${repository.replace(
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
			<h1>${title}</h1>
			<ul
				role="list"
				class="flow">
				${this.createProjectsList(projects)}
			</ul>
		`;
	}
}

module.exports = Projects;
