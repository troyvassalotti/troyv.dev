// This is for the handdrawn annotations from Rough Notation
import {annotate} from '/assets/js/rough-notation.js';

const projectsTitle = document.querySelector('#proj-title');
projectsTitle.setAttribute("style", "color: var(--blackPrimary)");
const projectsAnnotation = annotate(projectsTitle, {
  type: 'highlight',
  color: 'var(--projectsColor)',
  padding: 15,
});

projectsAnnotation.show();
