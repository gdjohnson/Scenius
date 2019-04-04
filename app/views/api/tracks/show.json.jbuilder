json.extract! @track, :id, :title, :lyrics, :poster_id, :album_id, :artist_id, :genre_tag, :audio_link

json.artist do
    json.extract! @track.artist, :id, :name, :image_url
end

json.album do
    json.extract! @track.album, :id, :title, :year, :artwork_url
end

