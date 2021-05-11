// This is for the handdrawn annotations from Rough Notation
import {annotate} from '/assets/js/rough-notation.js';

const pageTitle = document.querySelector('#page-title');
const postsAnnotation = annotate(pageTitle, {
  type: 'circle',
  color: 'var(--postsColor)',
  padding: 15,
});

postsAnnotation.show();
