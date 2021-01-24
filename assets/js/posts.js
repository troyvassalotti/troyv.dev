// This is for the handdrawn annotations from Rough Notation
import {
  annotate
} from 'https://unpkg.com/rough-notation?module';
import {
  annotationGroup
} from 'https://unpkg.com/rough-notation?module';

const postsTitle = document.querySelector('#posts-title');
const postsAnnotation = annotate(postsTitle, {
  type: 'circle',
  color: 'var(--postsColor)',
  padding: 15
});

postsAnnotation.show();