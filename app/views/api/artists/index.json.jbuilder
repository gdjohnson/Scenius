@artists.each do |artist|
    json.set! artist.id do
        json.extract! artist, :id, :name

        json.albums(artist.albums) do |album|
            json.extract! album, :id, :title, :year, :artwork_url
            json.tracks(album.tracks) do |track|
                json.extract! track, :id, :title
            end
        end
    end
end