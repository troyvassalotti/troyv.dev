/** @format */

import {html} from "common-tags";
import {Mixin} from "../mixins/mixin.js";

const RendersPosts = Mixin((Base) => {
	return class extends Base {
		generatePostListItems(posts) {
			let sortedPosts = posts.toReversed();
			let listHtml = sortedPosts.map(({date, data: {title}, url}) => {
				/**
				 * @todo properly support excerpts
				 * Right now they render as markdown strings, and many posts don't have one assigned.
				 */
				return html`
					<li>
						<article class="postListItem">
							<p class="postListItem__date u-step--1">
								${this.dateString(date)}
							</p>
							<h2 class="postListItem__title u-step-2">
								<a href="${url}">${title}</a>
							</h2>
						</article>
					</li>
				`;
			});

			return listHtml;
		}

		generatePostList(posts, ordered = false) {
			let listType = ordered ? "ol" : "ul";

			return html`
				<${listType} class="postList flow" role="list">
					${this.generatePostListItems(posts)}
				</${listType}>
			`;
		}
	};
});

export default RendersPosts;
