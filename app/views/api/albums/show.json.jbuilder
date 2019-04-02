json.set! @album.id do
  json.extract! @album, :id, :title, :artist_id, :artwork_url, :year
end