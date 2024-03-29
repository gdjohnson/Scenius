export const createTrack = (track) => {
  return $.ajax({
    method: 'POST',
    url: 'api/tracks',
    data: { track }
  });
};

export const fetchTrack = (id) => {
  return $.ajax({
    method: 'GET',
    url: `api/tracks/${id}`
  });
};

export const fetchTracks = () => {
  return $.ajax({
    method: 'GET',
    url: `api/tracks`
  });
};

export const searchTracks = (searchTerm) => {
  return $.ajax({
    method: 'GET',
    url: `api/tracks`,
    data: { searchTerm }
  })
}

export const alterTrack = (track) => {
  return $.ajax({
    method: 'PATCH',
    url: `api/tracks/${track.id}`,
    data: { track }
  });
};