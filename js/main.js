/* global data */
/* exported data */

const $placeholderImage = document.querySelector('.placeholder-image');
const $photoUrl = document.querySelector('.url');
$photoUrl.addEventListener('input', function (event) {
  $placeholderImage.setAttribute('src', event.target.value);
});

const $entryForm = document.querySelector('.form');
let nextEntryID = 1;
// console.log($entryForm);
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
  data.view = 'entries';
  // console.log(data.view);
  $placeholderImage.setAttribute('src', 'images/placeholder-image-square.jpg');
  document.querySelector('.form').reset();
});

// function showView() {
//  data.view.replace
// }
const $allViews = document.querySelectorAll('.view');
// console.dir($allViews);

document.addEventListener('click', function (event) {
  if (event.target.matches('a')) {
    const $dataView = event.target.getAttribute('data-view');
    for (let i = 0; i < $allViews.length; i++) {
      if ($allViews[i].getAttribute('data-view') === $dataView) {
        $allViews[i].className = 'container view';
      } else {
        $allViews[i].className = 'container view ' + 'hidden';
      }
    }
  }
});

function newEntry(entry) {
  const $entryItem = document.createElement('li');
  $entryItem.setAttribute('class', 'row entry-list-item');

  const $entryContent = document.createElement('div');
  $entryContent.setAttribute('class', 'column-half entry-content');
  $entryItem.appendChild($entryContent);

  const $entryImage = document.createElement('img');
  $entryImage.setAttribute('class', 'column-full entry-image');
  $entryImage.setAttribute('src', entry.url);
  $entryImage.setAttribute('alt', entry.title);
  $entryContent.appendChild($entryImage);

  const $entryText = document.createElement('div');
  $entryText.setAttribute('class', 'column-half entry-text');
  $entryItem.appendChild($entryText);

  const $entryTitle = document.createElement('h2');
  $entryTitle.setAttribute('class', 'entry-title');
  const $titleText = document.createTextNode(entry.title);
  $entryTitle.appendChild($titleText);
  $entryText.appendChild($entryTitle);

  const $entryNotes = document.createElement('p');
  $entryNotes.setAttribute('class', 'entry-notes');
  const $notesText = document.createTextNode(entry.notes);
  $entryNotes.appendChild($notesText);
  $entryText.appendChild($entryNotes);

  return $entryItem;
}

const $entryList = document.querySelector('.entry-list');
const $noEntries = document.querySelector('.no-entries');

document.addEventListener('DOMContentLoaded', function (event) {
  for (var i = 0; i < data.entries.length; i++) {
    var $domTree = newEntry(data.entries[i]);
    $entryList.appendChild($domTree);
    $noEntries.className = 'hidden';
  }
});
