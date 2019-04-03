@artists.each do |artist|
    json.set! artist.id do
        json.extract! artist, :id, :name
    end

    json.albums do 
        artist.albums.each do |album|
            json.extract! album, :id, :title, :artwork_url, :year
        end
    end

    json.tracks do
        artist.tracks.each do |track|
            json.extract! track, :id, :title
        end
    end
end