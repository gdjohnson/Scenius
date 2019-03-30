# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

#Users
graham = User.create(username: "graham", password_digest: "123456", session_token: "789")

#Artists
roxymusic = Artist.create(name: "Roxy Music")
robertaflack = Artist.create(name: "Roberta Flack")


#Albums
fleshnblood = Album.create(title: "Flesh + Blood", artist_id: 1, year: 1980)
avalon = Album.create(title: "Avalon", artist_id: 1, year: 1982)