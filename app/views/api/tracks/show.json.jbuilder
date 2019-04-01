json.set! @track.id do
    json.extract! @track, :id, :title, :lyrics, :poster_id, :album_id, :artist_id, :genre_tag, :audio_link
end

