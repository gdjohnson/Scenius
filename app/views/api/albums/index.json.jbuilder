@albums.each do |album|
    json.set! album.title do
      json.extract! album, :id, :title, :artist_id, :year
    end
end