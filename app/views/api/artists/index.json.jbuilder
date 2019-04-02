@artists.each do |artist|
    json.set! artist.name do
        json.extract! artist, :id, :name
    end
end