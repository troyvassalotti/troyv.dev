// This is for the handdrawn annotations from Rough Notation
import {annotate} from '/assets/js/rough-notation.js';

const aboutTitle = document.querySelector('#about-title');
const aboutAnnotation = annotate(aboutTitle, {
    type: 'bracket',
    color: 'var(--aboutColor)',
    brackets: [
        'left', 'right',
    ],
});

aboutAnnotation.show();
