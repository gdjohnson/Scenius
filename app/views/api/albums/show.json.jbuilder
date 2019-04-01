json.set! @album.id
  json.extract! @album, :id, :name, :artist_id, :year
end