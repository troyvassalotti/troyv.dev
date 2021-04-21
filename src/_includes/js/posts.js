// This is for the handdrawn annotations from Rough Notation
import {annotate} from '/assets/js/rough-notation.js';

const postsTitle = document.querySelector('#posts-title');
const postsAnnotation = annotate(postsTitle, {
  type: 'circle',
  color: 'var(--postsColor)',
  padding: 15,
});

postsAnnotation.show();
