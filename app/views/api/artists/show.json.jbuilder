json.extract! @artist, :id, :name, :image_url, :bio

json.albums(@artist.albums) do |album|
    json.extract! album, :id, :title, :year, :artwork_url, :background_photo
    json.tracks(album.tracks) do |track|
        json.extract! track, :id, :title
    end
end