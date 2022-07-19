import { LitElement, css, html } from "lit";

class LoadingSpinner extends LitElement {
  static get styles() {
    return [
      css`
        .spinner {
          animation: spinner 2s infinite linear;
          aspect-ratio: 1;
          background-image: conic-gradient(#25b09b 25%, #f03355 0 50%, #514b82 0 75%, #ffa516 0);
          border-radius: 50%;
          box-sizing: border-box;
          inline-size: 50px;
          display: grid;
          inset-block: 50vh;
          inset-inline: 0;
          margin-inline: auto;
          position: fixed;
        }

        .spinner::before,
        .spinner::after {
          animation: inherit;
          background: inherit;
          border-radius: 50%;
          box-sizing: inherit;
          content: "";
          grid-area: 1 / 1;
          margin: 15%;
        }

        .spinner::after {
          animation-duration: 3s;
          margin: 25%;
        }

        @keyframes spinner {
          100% {
            transform: rotate(1turn);
          }
        }
      `,
    ];
  }

  constructor() {
    super();
  }

  render() {
    return html` <div class="spinner" aria-hidden="true"></div>`;
  }
}

customElements.define("loading-spinner", LoadingSpinner);
