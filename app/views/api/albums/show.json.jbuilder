json.extract! @album, :id, :title, :artist_id, :artwork_url, :year

json.artist do
  json.extract! @album.artist, :name, :image_url
end

json.tracks(@album.tracks) do |track|
    json.extract! track, :id, :title
end