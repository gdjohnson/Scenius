export const fetchAlbum = (id) => {
  return $.ajax({
    method: 'GET',
    url: `api/albums/${id}`,
  });
};

export const fetchAlbums = () => {
  return $.ajax({
    method: 'GET',
    url: `api/albums`,
  });
};

export const createAlbum = (album) => {
  return $.ajax({
    method: 'POST',
    url: 'api/albums',
    data: { album }
  });
};

export const searchAlbums = (searchTerm) => {
  return $.ajax({
    method: 'GET',
    url: `api/albums`,
    data: { searchTerm }
  })
}

export const alterAlbum = (album) => {
  return $.ajax({
    method: 'PATCH',
    url: `api/albums/${album.id}`,
    data: { album }
  });
};