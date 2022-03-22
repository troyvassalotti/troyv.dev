/**
 * Creates a LightBox Web Component
 */
class LightBox extends HTMLImageElement {
  constructor() {
    super();

    /**
     * Defaults to the base image if no data-lbsrc is provided
     * @type {string}
     */
    const lightboxImage = this.dataset.lbsrc ? this.dataset.lbsrc : this.src;

    const lb = document.createElement("div");
    const styles = {
      background: `rgba(0, 0, 0, 0.7) url(${lightboxImage}) no-repeat center`,
      blockSize: "100vh",
      cursor: "zoom-out",
      display: "none",
      inlineSize: "100vw",
      inset: 0,
      position: "absolute"
    };

    /**
     * Iterate over all the props in the styles variable to assign inline styles to the lightbox
     */
    for (const property in styles) {
      lb.style[property] = styles[property];
    }

    lb.addEventListener("click", function () {
      this.style.display = "none";
    });

    this.style.cursor = "zoom-in";
    this.parentNode.insertBefore(lb, this);
    this.addEventListener("click", function () {
      lb.style.display = "block";
    });
  }
}

customElements.define("light-box", LightBox, { extends: "img" });
