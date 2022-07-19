import { LitElement, css, html, nothing } from "lit";

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
          font-size: var(--step-1);
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
    return this.tags.split(", ");
  }

  get tagObjects() {
    //  TODO: create array of objects with tag name and tag slug
    return [{}];
  }

  render() {
    return html`
      <nav aria-label="tags" class="tags">
        <p class="title">Tags (${this.tagList.length}):</p>
        <ul role="list" class="cloud">
          ${this.tagObjects.map((tag) => {
            return html` <li>
              <a href="${this.base + tag.slug}"
                ><span class="visually-hidden">Posts tagged </span></a
              >
            </li>`;
          })}
        </ul>
      </nav>
    `;
  }
}

customElements.define("tag-cloud", TagCloud);
