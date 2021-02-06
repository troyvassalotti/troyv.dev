// This is for the handdrawn annotations from Rough Notation
import {annotate} from 'https://unpkg.com/rough-notation?module';
import {annotationGroup} from 'https://unpkg.com/rough-notation?module';

const aboutTitle = document.querySelector('#about-title');
const aboutAnnotation = annotate(aboutTitle, {
  type: 'bracket',
  color: 'var(--aboutColor)',
  brackets: [
    'left', 'right',
  ],
});

aboutAnnotation.show();
