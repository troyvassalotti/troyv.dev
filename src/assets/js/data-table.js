import { LitElement, css, html, nothing } from "lit";

class DataTable extends LitElement {
  static get styles() {
    return [
      css`
        :host {
          box-sizing: border-box;
          display: block;
          overflow: auto;
        }

        *,
        *::after,
        *::before {
          box-sizing: inherit;
          margin: 0;
        }

        table {
          border: 1px solid currentColor;
          border-collapse: collapse;
          color: var(--eerie-black);
          font-family: var(--code);
          inline-size: max-content;
          table-layout: fixed;
        }

        caption {
          font-weight: bold;
          inline-size: fit-content;
          inset-inline-start: 0;
          margin-block-end: var(--space-3xs);
          position: sticky;
          text-align: start;
          text-transform: uppercase;
        }

        th {
          text-align: start;
        }

        :is(th, td) {
          max-inline-size: var(--colWidth, auto);
          padding-block: var(--space-3xs);
          padding-inline: var(--space-xs);
        }

        th:nth-of-type(1),
        tr th {
          --colWidth: 10ch;
        }

        th:nth-of-type(2),
        tr td:nth-of-type(1) {
          --colWidth: 30ch;
        }

        th:nth-of-type(3),
        tr td:nth-of-type(2) {
          --colWidth: 45ch;
        }

        th:nth-of-type(4),
        tr td:nth-of-type(3) {
          --colWidth: 40ch;
        }

        tr:nth-of-type(odd) {
          background-color: var(--pale-silver);
        }

        tr:nth-of-type(even) {
          background-color: var(--snow);
        }
      `,
    ];
  }

  static get properties() {
    return {
      caption: { type: String },
      headers: { type: String },
    };
  }

  constructor() {
    super();
    this.caption = "";
    this.headers = "";
  }

  get data() {
    return this.getAttribute("data");
  }

  render() {
    const parsedData = JSON.parse(this.data);
    const headersList = this.headers.split(" ");

    return html`
      <table>
        ${this.caption
          ? html` <caption>
              ${this.caption}
            </caption>`
          : nothing}
        <colgroup>
          ${headersList.map((header) => {
            return html` <col class="col--${header.toLowerCase()}" /> `;
          })}
        </colgroup>
        <thead>
          <tr>
            ${headersList.map((header) => {
              return html` <th id="${header.toLowerCase()}" scope="col">${header}</th> `;
            })}
          </tr>
        </thead>
        <tbody>
          ${parsedData.map((track, index) => {
            return html`
              <tr>
                <th
                  id="order-${headersList[0].toLowerCase()}"
                  headers="${headersList[0].toLowerCase()}"
                  scope="row">
                  ${index + 1}
                </th>
                ${Object.keys(track).map((item, index) => {
                  return html`
                    <td
                      headers="order-${headersList[0].toLowerCase()} ${headersList[
                        index
                      ].toLowerCase()}">
                      ${track[item]}
                    </td>
                  `;
                })}
              </tr>
            `;
          })}
        </tbody>
      </table>
    `;
  }
}

customElements.define("data-table", DataTable);
