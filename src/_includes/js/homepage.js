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

// create the intersection observer for the annoations
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
const sundialIcon = sundial.querySelector("svg");

const sun = `<circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>`;

const moon = `<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>`;

sundial.addEventListener("click", () => {
    if (sundialIcon.innerHTML === sun) {
        clouds.classList.add("sunset");
        sundialIcon.innerHTML = moon;
    } else if (sundialIcon.innerHTML === moon) {
        clouds.classList.remove("sunset");
        sundialIcon.innerHTML = sun;
    }
});
