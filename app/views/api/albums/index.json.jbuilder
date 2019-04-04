@albums.each do |album|
    json.set! album.id do
      json.extract! album, :id, :title, :artist_id, :year
    
      json.artist album.artist

      json.tracks(album.tracks) do |track| 
          json.extract! track, :title
      end
    end
end