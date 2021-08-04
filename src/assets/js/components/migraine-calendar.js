// this isn't working but hopefully I can figure it out some day'

class MigraineCalendar extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.migraines = this.getAttribute("file");
    this.startYear = this.getAttribute("start");
    this.endYear = this.getAttribute("end");
  }

  connectedCallback() {
    const { shadowRoot } = this;
    shadowRoot.innerHTML = `
            <style>
                div#calendar-heatmap {
                  overflow: auto;
                  background-color: var(--whitePrimary);
                  padding-block-start: 1em;
                  padding-block-end: 1em;
                }
                
                div#calendar-heatmap svg.calendar {
                  width: max(56.25rem, 100%);
                  color: var(--blackPrimary);
                }
            </style>

            <div id="calendar-heatmap"></div>
            
        `;

    // Take the migraine data and turn it into a new array for D3 to work with
    import(`../${this.migraines}.js`).then((module) => {
      let migraines = module.migraines;
      const data = new Map(
        migraines.map((value) => [value["Date"], value["Time"]])
      );

      // Define all the variables
      // The svg are made responsive within setting the width and height attr to 100%
      const width = 960,
        height = 136,
        cellSize = 17,
        mainStrokeColor = "currentColor",
        defaultStrokeWidth = "0.1px",
        boldedStrokeWidth = "1px",
        outerBorderWidth = "1.5px",
        labelFontFamily = "Native";

      // Create the color scale
      const color = d3
        .scaleQuantize()
        .domain([0, 23])
        .range(["#b1deff", "#54b1f5", "#0264a9", "#002b4c"]);

      // Create the overall SVG element
      const svg = d3
        .select("#calendar-heatmap")
        .selectAll("svg")
        .data(d3.range(this.startYear, this.endYear))
        .enter()
        .append("svg")
        .attr("viewBox", `0 0 ${width} ${height}`)
        .attr("width", "100%")
        .attr("height", "100%")
        .attr("class", "calendar")
        .append("g")
        .attr(
          "transform",
          `translate(${(width - cellSize * 53) / 2}, ${
            height - cellSize * 7 - 1
          })`
        );

      // Create the rectangles on the chart
      svg
        .append("g")
        .attr("fill", "none")
        .attr("stroke", mainStrokeColor)
        .attr("stroke-width", defaultStrokeWidth)
        .selectAll("rect")
        .data((d) => d3.timeDays(new Date(d, 0, 1), new Date(d + 1, 0, 1)))
        .enter()
        .append("rect")
        .attr("class", "day")
        .attr("width", cellSize)
        .attr("height", cellSize)
        .attr("x", (d) => d3.timeWeek.count(d3.timeYear(d), d) * cellSize)
        .attr("y", (d) => d.getDay() * cellSize)
        .datum(d3.timeFormat("%Y-%m-%d"))
        .attr("fill", (d) => color(parseInt(data.get(d))));

      // Check if there's a filled in day and then attach the even handlers to it
      const Days = document.querySelectorAll(".day");
      Days.forEach((day) => {
        if (day.hasAttribute("fill")) {
          d3.select(day)
            .on("mouseover", function () {
              d3.select(this).attr("stroke-width", boldedStrokeWidth);
            })
            .on("mouseout", function () {
              d3.select(this).attr("stroke-width", defaultStrokeWidth);
            })
            .append("title")
            .text(
              (d) => `Date: ${d}
        Time: ${data.get(d)}`
            );
        }
      });

      // Create the year labels
      svg
        .append("text")
        .attr("transform", `translate(-6, ${cellSize * 3.5})rotate(-90)`)
        .attr("font-family", labelFontFamily)
        .attr("font-size", "1em")
        .attr("text-anchor", "middle")
        .attr("fill", mainStrokeColor)
        .text((d) => d);

      // Create the borders between the months
      svg
        .append("g")
        .attr("fill", "none")
        .attr("stroke", mainStrokeColor)
        .attr("stroke-width", outerBorderWidth)
        .selectAll("path")
        .data((d) => d3.timeMonths(new Date(d, 0, 1), new Date(d + 1, 0, 1)))
        .enter()
        .append("path")
        .attr("class", "month")
        .attr("d", function (d) {
          const t1 = new Date(d.getFullYear(), d.getMonth() + 1, 0),
            d0 = d.getDay(),
            w0 = d3.timeWeek.count(d3.timeYear(d), d),
            d1 = t1.getDay(),
            w1 = d3.timeWeek.count(d3.timeYear(t1), t1);
          return `M${
            (w0 + 1) * cellSize
          }, ${d0 * cellSize}H${w0 * cellSize}V${7 * cellSize}H${w1 * cellSize}V${(d1 + 1) * cellSize}H${(w1 + 1) * cellSize}V0H${(w0 + 1) * cellSize}Z`;
        });

      // Create the month labels above the blocks
      const axisScale = d3
        .scaleBand()
        .domain([
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ])
        .range([0, width - 50]);

      const xAxis = d3.axisTop(axisScale).tickSize(0).tickPadding("3");
      svg
        .append("g")
        .attr("id", "x-axis")
        .attr("style", `font-family: ${labelFontFamily}`)
        .call(xAxis)
        .selectAll("path")
        .attr("stroke", "transparent");
    });
  }
}

customElements.define("migraine-calendar", MigraineCalendar);
