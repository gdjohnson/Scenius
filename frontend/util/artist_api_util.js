export const fetchArtist = (id) => {
  return $.ajax({
    method: 'GET',
    url: `api/artists/${id}`,
  });
};

export const fetchArtists = () => {
  return $.ajax({
    method: 'GET',
    url: `api/artists`,
  });
};

export const fetchArtistsByLetter = (char) => {
  return $.ajax({
    method: 'GET',
    url: `api/artists`,
    data: { char }
  });
};

export const createArtist = (artist) => {
  return $.ajax({
    method: 'POST',
    url: 'api/artists',
    data: { artist }
  });
};

export const searchArtists = (searchTerm) => {
  return $.ajax({
    method: 'GET',
    url: `api/artists`,
    data: { searchTerm }
  })
}

export const alterArtist = (artist) => {
  return $.ajax({
    method: 'PATCH',
    url: `api/artists/${artist.id}`,
    data: { artist }
  });
};