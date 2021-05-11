// This is for the handdrawn annotations from Rough Notation
import {annotate} from '/assets/js/rough-notation.js';

const pageTitle = document.querySelector('#page-title');
const aboutAnnotation = annotate(pageTitle, {
    type: 'bracket',
    color: 'var(--aboutColor)',
    brackets: [
        'left', 'right',
    ],
});

aboutAnnotation.show();
