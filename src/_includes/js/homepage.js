// This is for the handdrawn annotations from Rough Notation
import {annotate, annotationGroup} from '/assets/js/rough-notation.js';

const e1 = document.querySelector('#cool-anim');
const a1 = annotate(e1, {
  type: 'box',
  color: 'var(--bluePrimary)',
});

const e2 = document.querySelector('#proj-anim');
const a2 = annotate(e2, {
  type: 'underline',
  color: 'var(--redPrimary)',
  padding: 10,
});

// create an annotation group
const ag = annotationGroup([a1, a2,]);

// create the intersection observer for the annotations
function handleHandrawing(entries) {
  entries.map((entry) => {
    if (entry.isIntersecting) {
      ag.show();
      handDrawObserver.unobserve(entry.target);
    }
  });
}

const options = {
  root: null,
  rootMargin: "0px",
  threshold: .5,
}

const handDrawObserver = new IntersectionObserver(handleHandrawing, options);
handDrawObserver.observe(e1);

// deal with the clouds
const more = document.querySelector("#more");
const clouds = document.querySelector("#clouds");
clouds.classList.add("sunset");

function handleClouds(entries) {
  entries.map((entry) => {
    if (entry.isIntersecting) {
      clouds.classList.remove("sunset");
      cloudsObserver.unobserve(entry.target);
    }
  });
}

const cloudsObserver = new IntersectionObserver(handleClouds);
cloudsObserver.observe(more);

const sundial = document.querySelector("#sundial");
const sundialIcon = sundial.querySelector("img");
const sun = "sun"
const moon = "moon";

sundial.addEventListener("click", () => {
    if (sundialIcon.classList.contains(sun)) {
        clouds.classList.add("sunset");
        sundialIcon.setAttribute('src', `/assets/img/${moon}.svg`);
        sundialIcon.classList.remove(sun);
        sundialIcon.classList.add(moon);
    } else if (sundialIcon.classList.contains(moon)) {
        clouds.classList.remove("sunset");
        sundialIcon.setAttribute('src', `/assets/img/${sun}.svg`);
        sundialIcon.classList.remove(moon);
        sundialIcon.classList.add(sun);
    }
});
