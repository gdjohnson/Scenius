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

export const createArtist = (artist) => {
  debugger
  return $.ajax({
    method: 'POST',
    url: 'api/artists',
    data: { artist }
  });
};

export const alterArtist = (artist) => {
  return $.ajax({
    method: 'PATCH',
    url: `api/artists/${artist.id}`,
    data: { artist }
  });
};