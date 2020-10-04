let btn = document.getElementById('btn');
let albumsContainer = document.getElementById('albums-container');
let yearTextbox = document.getElementById('year');
let year = '';

yearTextbox.addEventListener('input', () => {
  year = yearTextbox.value;
});

btn.addEventListener('click', function() {
  let albumsRequest = new XMLHttpRequest();

  // GET request
  albumsRequest.open('GET', `https://arjobosh.github.io/json/albums/${year}.json`);
  
  // once the data is loaded
  albumsRequest.onload = function() {
    // defaultly returns as a string, so parse to return as json
    let albumData = JSON.parse(albumsRequest.responseText);
    renderAlbumCard(albumData);
  };
  
  // send the request
  albumsRequest.send();
});

function renderAlbumCard(data) {
  for (let i = 0; i < data.length; i++) {
    let album = data[i];
    let albumCard = document.createElement('div');
    albumCard.className = 'album-card';

    let cardHeading = document.createElement('span');
    cardHeading.innerHTML = `${album.title} by ${album.artist}`;
    albumCard.appendChild(cardHeading);

    albumCard.appendChild(createAlbumTable(album.trackList));
    albumsContainer.appendChild(albumCard);
  } 
}

function createAlbumTable(trackList) {
    let trackListContainer = document.createElement('table');

    for (let i = 0; i < trackList.length; i++) {
      let trackRow = document.createElement('tr');

      trackRow.className = 'track-row';
      let trackNum = document.createElement('td');
      trackNum.textContent = `${i+1}.`;
      trackRow.appendChild(trackNum);

      let trackTitle = document.createElement('td');
      trackTitle.textContent = `${trackList[i]}`;
      trackRow.appendChild(trackTitle);

      trackListContainer.appendChild(trackRow);
    }

    return trackListContainer;
}