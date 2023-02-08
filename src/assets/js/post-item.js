import { css, html, LitElement, nothing } from "lit";

/**
 * Post Item web component.
 * @deprecated
 * @since 2023-02-07
 */
class PostItem extends LitElement {
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

        a {
          color: var(--links);
        }

        a:hover,
        a:focus {
          filter: brightness(0.7);
        }

        a:focus-visible {
          outline: 2px dashed var(--links);
          outline-offset: 2px;
        }

        .title {
          font-family: var(--headings);
          font-size: var(--step-3);
          margin-block-end: var(--space-2xs);
        }

        .date {
          font-size: var(--step--1);
          font-style: italic;
          margin-block-end: var(--space-3xs);
        }
      `,
    ];
  }

  static get properties() {
    return {
      date: { type: String },
      heading: { type: String },
      excerpt: { type: String },
      url: { type: String },
      level: { type: Number },
    };
  }

  constructor() {
    super();
    this.date = "";
    this.heading = "";
    this.excerpt = "";
    this.url = "";
    this.level = 2;
  }

  render() {
    return html`
      <article class="item" part="p-item">
        <p class="date" part="p-date">${this.date}</p>
        ${this.level === 3
          ? html`<h3 class="title" part="p-heading"><a href="${this.url}">${this.heading}</a></h3>`
          : html`<h2 class="title" part="p-heading"><a href="${this.url}">${this.heading}</a></h2>`}
        ${this.excerpt ? html`<p class="excerpt" part="p-excerpt">${this.excerpt}</p>` : nothing}
      </article>
    `;
  }
}

customElements.define("post-item", PostItem);
