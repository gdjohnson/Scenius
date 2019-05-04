@annotations.each do |annotation|
    json.set! annotation.id do
        json.extract! annotation, :id, :start_idx, :end_idx, :content, :user_id, :track_id
    end
end
