import { LitElement, css, html } from "lit";
import { map } from "lit-map";
import slugify from "slugify";

class TagCloud extends LitElement {
  static get styles() {
    return [
      css`
        :host {
          display: block;
        }

        * {
          box-sizing: border-box;
          margin: 0;
        }

        *::after,
        *::before {
          box-sizing: inherit;
        }

        .title {
          font-family: var(--headings);
          font-size: var(--step-1);
          font-weight: bold;
          margin-block-end: revert;
        }

        ul {
          list-style: none;
          padding: 0;
        }

        .visually-hidden:not(:focus):not(:active) {
          block-size: 1px;
          clip: rect(0 0 0 0);
          clip-path: inset(50%);
          inline-size: 1px;
          overflow: hidden;
          position: absolute;
          white-space: nowrap;
        }

        .tag {
          background-color: var(--foreground);
          border-radius: 4px;
          color: var(--background);
          display: inline-block;
          font-size: var(--step--1);
          padding-inline: 8px;
        }

        .tag::before {
          content: "#";
        }

        .cloud {
          display: flex;
          flex-wrap: wrap;
          gap: var(--space-2xs-xs);
        }
      `,
    ];
  }

  static get properties() {
    return {
      base: { type: String },
      tags: { type: String },
    };
  }

  constructor() {
    super();
    this.base = "";
    this.tags = "";
  }

  get tagList() {
    return this.tags.split(",");
  }

  get tagObjects() {
    return this.tagList.map(function (tag) {
      return {
        tag,
        slug: slugify(tag),
      };
    });
  }

  render() {
    console.log(this.tags);
    console.log(this.tagList);
    console.log(this.tagObjects);
    return html`
      <nav aria-label="tags" class="tags">
        <p class="title">Tags (${this.tagList.length}):</p>
        <ul role="list" class="cloud">
          ${map(
            this.tagObjects,
            (tag) => html` <li>
              <a class="tag" href="${this.base + tag.slug + "/"}"
                ><span class="visually-hidden">Posts tagged </span>${tag.tag}</a
              >
            </li>`
          )}
        </ul>
      </nav>
    `;
  }
}

customElements.define("tag-cloud", TagCloud);
