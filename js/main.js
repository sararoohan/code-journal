/* global data */
/* exported data */

const $img = document.querySelector('img');
const $photoUrl = document.querySelector('.url');

$photoUrl.addEventListener('input', function (event) {
  $img.setAttribute('src', event.target.value);
});

const $entryForm = document.querySelector('.form');
let nextEntryID = 1;

$entryForm.addEventListener('submit', function (event) {
  event.preventDefault();
  nextEntryID++;
  const formEntries = {
    title: $entryForm.elements.title.value,
    url: $entryForm.elements.url.value,
    notes: $entryForm.elements.notes.value,
    nextEntryID: nextEntryID
  };
  data.entries.unshift(formEntries);
  $img.setAttribute('src', 'images/placeholder-image-square.jpg');
  document.querySelector('.form').reset();
});
