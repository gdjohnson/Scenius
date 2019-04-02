
json.track do
    json.extract! @track, :id, :title, :lyrics, :poster_id, :album_id, :artist_id, :genre_tag, :audio_link
end

json.associations do 
    json.artist do
        json.extract! @track.artist, :name
    end
    json.album do
        json.extract! @track.album, :title, :year, :artwork_url
    end
end
