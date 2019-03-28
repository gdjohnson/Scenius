export const fetchAlbum = (id) => {
  return $.ajax({
    method: 'GET',
    url: `api/albums/${id}`,
  });
};

export const fetchAlbums = () => {
  debugger
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

export const alterAlbum = (album) => {
  return $.ajax({
    method: 'PATCH',
    url: `api/albums/${album.id}`,
    data: { album }
  });
};