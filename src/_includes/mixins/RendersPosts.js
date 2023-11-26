/** @format */

const {html} = require("common-tags");

const RendersPosts = function (Base) {
	return class extends Base {
		generatePostListItems(posts) {
			let sortedPosts = posts.toReversed();
			let listHtml = sortedPosts.map(({date, data: {title}, url, excerpt}) => {
				return html`
					<li>
						<article class="c-postListItem flow">
							<p class="c-postListItem__date">${this.dateString(date)}</p>
							<h2 class="c-postListItem__title">
								<a href="${url}">${title}</a>
							</h2>
							${excerpt
								? html`<p class="c-postListItem__excerpt">${excerpt}</p>`
								: ""}
						</article>
					</li>
				`;
			});

			return listHtml;
		}

		generatePostList(posts, ordered = false) {
			let listType = ordered ? "ol" : "ul";

			return html`
				<${listType} class="c-postList flow" role="list">
					${this.generatePostListItems(posts)}
				</${listType}>
			`;
		}
	};
};

module.exports = RendersPosts;
