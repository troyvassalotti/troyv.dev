// This is for the handdrawn annotations from Rough Notation
import {
  annotate
} from 'https://unpkg.com/rough-notation?module';
import {
  annotationGroup
} from 'https://unpkg.com/rough-notation?module';

const projectsTitle = document.querySelector('#proj-title');
projectsTitle.setAttribute("style", "color: var(--blackPrimary)");
const projectsAnnotation = annotate(projectsTitle, {
  type: 'highlight',
  color: 'var(--projectsColor)',
  padding: 15
});

projectsAnnotation.show();