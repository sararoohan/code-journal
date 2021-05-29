/* global data */
/* exported data */

const $placeholderImage = document.querySelector('.placeholder-image');
const $photoUrl = document.querySelector('.url');
const $allViews = document.querySelectorAll('.view');
const $entryForm = document.querySelector('.form');
let nextEntryID = 1;
const $entryList = document.querySelector('.entry-list');
const $noEntries = document.querySelector('.no-entries');

function showView(view) {
  for (let viewIndex = 0; viewIndex < $allViews.length; viewIndex++) {
    if ($allViews[viewIndex].getAttribute('data-view') === view) {
      $allViews[viewIndex].className = 'container view';
    } else {
      $allViews[viewIndex].className = 'container view ' + 'hidden';
    }
  }
}

$photoUrl.addEventListener('input', function (event) {
  $placeholderImage.setAttribute('src', event.target.value);
});

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
  showView('entries');

  const newEntry = renderEntry(formEntries);
  $entryList.prepend(newEntry);

  $placeholderImage.setAttribute('src', 'images/placeholder-image-square.jpg');
  $entryForm.reset();
});

document.addEventListener('click', function (event) {
  if (event.target.matches('a')) {
    const $dataView = event.target.getAttribute('data-view');
    if ($dataView === 'entry-form') {
      data.view = 'entry-form';
      showView('entry-form');
    } else if ($dataView === 'entries') {
      data.view = 'entries';
      showView('entries');
    }
  }
});

function renderEntry(entry) {
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
  $entryTitle.setAttribute('class', 'column-full entry-title');
  const $titleText = document.createTextNode(entry.title);
  $entryTitle.appendChild($titleText);
  $entryText.appendChild($entryTitle);
  const $editPen = document.createElement('i');
  $editPen.setAttribute('class', 'fas fa-pen');
  $editPen.setAttribute('data-entry-id', entry.nextEntryID);
  $entryTitle.appendChild($editPen);

  const $entryNotes = document.createElement('p');
  $entryNotes.setAttribute('class', 'column-full entry-notes');
  const $notesText = document.createTextNode(entry.notes);
  $entryNotes.appendChild($notesText);
  $entryText.appendChild($entryNotes);

  return $entryItem;
}

document.addEventListener('DOMContentLoaded', function (event) {
  for (let i = 0; i < data.entries.length; i++) {
    const $domTree = renderEntry(data.entries[i]);
    $entryList.appendChild($domTree);
    $noEntries.className = 'hidden';
  }
  showView(data.view);
});
