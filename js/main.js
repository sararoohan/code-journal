/* global data */
/* exported data */

const $placeholderImage = document.querySelector('.placeholder-image');
const $photoUrl = document.querySelector('.url');
const $allViews = document.querySelectorAll('.view');
const $entryForm = document.querySelector('.form');
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
  data.nextEntryId++;
  const $dataEntryID = parseInt(event.target.getAttribute('data-entry-id'));
  const formEntries = {
    title: $entryForm.elements.title.value,
    url: $entryForm.elements.url.value,
    notes: $entryForm.elements.notes.value,
    nextEntryId: data.nextEntryId
  };
  if (data.editing !== null) {
    data.entries.splice(data.entries.nextEntryId, 1, formEntries);
    for (var x = 0; x < $entryList.childNodes.length; x++) {
      var $entry = $entryList.childNodes[x];
      if ($dataEntryID === data.editing.nextEntryId) {
        $entry.replaceWith(renderEntry(formEntries));
      }
    }
    data.editing = null;
  } else {
    data.entries.unshift(formEntries);
    const $newEntry = renderEntry(formEntries);
    $entryList.prepend($newEntry);
  }
  showView('entries');
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

$entryList.addEventListener('click', function (event) {
  if (event.target.matches('i')) {
    showView('entry-form');
    const $dataEntryID = parseInt(event.target.getAttribute('data-entry-id'));
    for (let j = 0; j < data.entries.length; j++) {
      if (data.entries[j].nextEntryId === $dataEntryID) {
        data.editing = data.entries[j];
        const $populatedEntry = {
          title: $entryForm.elements.title.value = data.editing.title,
          url: $entryForm.elements.url.value = data.editing.url,
          notes: $entryForm.elements.notes.value = data.editing.notes,
          nextEntryId: data.nextEntryId = data.editing.nextEntryId
        };
        $placeholderImage.setAttribute('src', data.editing.url);
        data.editing = $populatedEntry;
      }
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
  $entryTitle.setAttribute('class', 'row entry-title');
  const $titleText = document.createTextNode(entry.title);
  $entryTitle.appendChild($titleText);
  $entryText.appendChild($entryTitle);
  const $editPen = document.createElement('i');
  $editPen.setAttribute('class', 'fas fa-pen');
  $editPen.setAttribute('data-entry-id', entry.nextEntryId);
  $entryTitle.appendChild($editPen);

  const $entryNotes = document.createElement('p');
  $entryNotes.setAttribute('class', 'entry-notes');
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
