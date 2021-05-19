/* global data */
/* exported data */

const $placeholderImage = document.querySelector('.placeholder-image');
const $photoUrl = document.querySelector('.url');
// console.log($photoUrl);
$photoUrl.addEventListener('input', function (event) {
  $placeholderImage.setAttribute('src', event.target.value);
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
  // console.log(data.entries)
  $placeholderImage.setAttribute('src', 'images/placeholder-image-square.jpg');
  document.querySelector('.form').reset();
});
