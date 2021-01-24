// This is for the handdrawn annotations from Rough Notation
import {
  annotate
} from 'https://unpkg.com/rough-notation?module';
import {
  annotationGroup
} from 'https://unpkg.com/rough-notation?module';

const musicTitle = document.querySelector('#music-title');
musicTitle.setAttribute("style", "color: var(--blackPrimary)");
const musicAnnotation = annotate(musicTitle, {
  type: 'highlight',
  color: 'var(--musicColor)',
  padding: 15
});

musicAnnotation.show();

const albumTitle = document.querySelector('#album-title');
const albumAnnotation = annotate(albumTitle, {
  type: 'box',
  color: 'var(--redPrimary)',
  multiline: true
});

function handleAlbum(entries) {
  entries.map((entry) => {
    if (entry.isIntersecting) {
      albumAnnotation.show();
      albumObserver.unobserve(entry.target);
    }
  });
}

const albumObserver = new IntersectionObserver(handleAlbum);
albumObserver.observe(albumTitle);