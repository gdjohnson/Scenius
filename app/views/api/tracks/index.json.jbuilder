@tracks.each do |track|
    json.set! track.title do
      json.extract! track, :id, :title, :lyrics, :poster_id, :album_id, :artist_id, :genre_tag, :audio_link
  
      json.album do
        json.extract! track.album, :title, :year, :artwork_url
      end

      json.artist do
        json.extract! track.artist, :name, :image_url
      end
    end
end

      