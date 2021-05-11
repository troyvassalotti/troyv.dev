// This is for the handdrawn annotations from Rough Notation
import {annotate} from '/assets/js/rough-notation.js';

let mq = '(prefers-color-scheme: light)';

const pageTitle = document.querySelector('#page-title');

const changeTitleColor = () => {
  console.log(matchMedia(mq));
  matchMedia(mq).matches ? pageTitle.setAttribute("style", "color: var(--whitePrimary)") : pageTitle.setAttribute("style", "color: var(--blackPrimary)");
}

matchMedia(mq).addEventListener("change", changeTitleColor());
const musicAnnotation = annotate(pageTitle, {
  type: 'highlight',
  color: 'var(--musicColor)',
  padding: 15,
});

musicAnnotation.show();

// const albumTitle = document.querySelector('#album-title');
// const albumAnnotation = annotate(albumTitle, {
//   type: 'box',
//   color: 'var(--redPrimary)',
//   multiline: true,
// });
//
// function handleAlbum(entries) {
//   entries.map((entry) => {
//     if (entry.isIntersecting) {
//       albumAnnotation.show();
//       albumObserver.unobserve(entry.target);
//     }
//   });
// }
//
// const albumObserver = new IntersectionObserver(handleAlbum);
// albumObserver.observe(albumTitle);
