@users.each do |user|
    user.extract! user, :username
end