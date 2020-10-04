

let albumsContainer = document.getElementById('albums-container');

let btn = document.getElementById('btn');

function clearContainer(element) {
  element.innerHTML = '';
}

btn.addEventListener('click', function () {
  clearContainer(albumsContainer);  
  let yearTextbox = document.getElementById('year');

  let albumsRequest = new XMLHttpRequest();

  // GET request
  albumsRequest.open('GET', `https://arjobosh.github.io/json/albums/${yearTextbox.value}.json`);

  // once the data is loaded
  albumsRequest.onload = function() {
    if (albumsRequest.status >= 200 && albumsRequest.status < 400) {
      // defaultly returns as a string, so parse to return as json
      let albumData = JSON.parse(albumsRequest.responseText);

      renderAlbumCard(albumData);
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
});

function renderAlbumCard(data) {
  for (let i = 0; i < data.length; i++) {
    let album = data[i];
    let albumCard = document.createElement('div');
    albumCard.className = 'album-card';

    let cardHeading = document.createElement('span');
    cardHeading.innerHTML = `${album.title} by ${album.artist}`;
    cardHeading.addEventListener('click', () => {
      let trackListTable = createTracklistTable(album.trackList);
      
      if (!cardHasTable(albumCard, trackListTable)) {
        albumCard.appendChild(trackListTable);
      }
      else {
        albumCard.lastChild.remove();
      }
    });

    albumCard.appendChild(cardHeading);
    albumsContainer.appendChild(albumCard);
  }
}

function createTracklistTable(trackList) {
  let trackListContainer = document.createElement('table');
  trackListContainer.className = 'tracklist-table'

  for (let i = 0; i < trackList.length; i++) {
    let trackRow = document.createElement('tr');
    trackRow.className = 'track-row';

    let trackNum = document.createElement('td');
    trackNum.textContent = `${i + 1}.`;
    trackRow.appendChild(trackNum);

    let trackTitle = document.createElement('td');
    trackTitle.textContent = `${trackList[i]}`;
    trackRow.appendChild(trackTitle);

    trackListContainer.appendChild(trackRow);
  }

  return trackListContainer;
}

function cardHasTable(card, table) {
  for (let i = 0; i < card.childNodes.length; i++) {
    if (card.childNodes[i].className == table.className) {
      return true;
    }
  }

  return false;
}

document.body.appendChild(albumsContainer);