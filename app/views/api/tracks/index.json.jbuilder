@tracks.each do |track|
    json.set! track.title do
      json.extract! track, :id, :title, :lyrics, :poster_id, :album_id, :artist_id, :genre_tag, :audio_link
    end
end

      