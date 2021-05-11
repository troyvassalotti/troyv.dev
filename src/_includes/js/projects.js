// This is for the handdrawn annotations from Rough Notation
import {annotate} from '/assets/js/rough-notation.js';

const pageTitle = document.querySelector('#page-title');
pageTitle.setAttribute("style", "color: var(--blackPrimary)");
const projectsAnnotation = annotate(pageTitle, {
  type: 'highlight',
  color: 'var(--projectsColor)',
  padding: 15,
});

projectsAnnotation.show();
