/* global data */
/* exported data */

function newEntry(entry) {
  const $entryItem = document.createElement('li');
  $entryItem.setAttribute('class', 'row');
  $entryItem.setAttribute('class', 'entry-list-item');

  const $entryContent = document.createElement('div');
  $entryContent.setAttribute('class', 'column-half');
  $entryContent.setAttribute('class', 'entry-content');

  $entryItem.appendChild($entryContent);

  const $entryImage = document.createElement('img');
  $entryImage.setAttribute('class', 'column-full');
  $entryImage.setAttribute('class', 'entry-image');

  $entryImage.setAttribute('src', entry.url);
  $entryImage.setAttribute('alt', entry.title);
  $entryContent.appendChild($entryImage);

  const $entryText = document.createElement('div');
  $entryText.setAttribute('class', 'column-half');
  $entryText.setAttribute('class', 'entry-text');
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

document.addEventListener('DOMContentLoaded', function (event) {
  // console.log('document loaded');

  for (var i = 0; i < data.entries.length; i++) {
    var $domTree = newEntry(data.entries[i]);
    $entryList.appendChild($domTree);
  }
});
