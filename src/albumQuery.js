const albumQuery = (() => {
  const getAlbumsContainer = () => {
    return document.getElementById('albums-container');
  }
  
  // returns album cards as an array of div elements
  const makeAlbumCards = (data) => {
    let albumCards = [];
  
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
      albumCards.push(albumCard);
    }
  
    return albumCards;
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
  
  const clearContainer = (element) => {
    element.innerHTML = '';
  }

  return {
    getAlbumsContainer, makeAlbumCards, clearContainer   
  }
})();

export { albumQuery };