import { albumQuery } from './albumQuery';

let go = document.getElementById('go-btn');
let albumsContainer = albumQuery.getAlbumsContainer();

go.addEventListener('click', function () {
  
  let yearTextbox = document.getElementById('year');

  albumQuery.clearContainer(albumsContainer);

  requestAlbums(yearTextbox.value);
});

function requestAlbums(year) {
  let albumsRequest = new XMLHttpRequest();

  // GET request
  albumsRequest.open('GET', `https://arjobosh.github.io/json/albums/${year}.json`);

  // once the data is loaded
  albumsRequest.onload = function() {
    if (albumsRequest.status >= 200 && albumsRequest.status < 400) {
      // defaultly returns as a string, so parse to return as json
      let albumData = JSON.parse(albumsRequest.responseText);

      albumQuery.makeAlbumCards(albumData).forEach(element => {
        albumsContainer.appendChild(element);
      });
    }
    else {
      alert('no json file for that year!');
    }
  };

  albumsRequest.onerror = function() {
    alert('connection error');
  };

  // send the request
  albumsRequest.send();
}