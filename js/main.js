/* global data */
/* exported data */

function handleInput(event) {
  $img.src = event.target.value;
}

const $photoUrl = document.querySelector('.photo-url');
const $img = document.querySelector('img');
$photoUrl.addEventListener('input', handleInput);
