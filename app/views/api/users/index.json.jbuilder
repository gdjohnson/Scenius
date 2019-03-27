@users.each do |user|
    user.extract! user, :id, :username
end