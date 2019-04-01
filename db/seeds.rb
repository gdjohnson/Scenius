# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

#Users
graham = User.create(username: "graham", password: "123456")
guest = User.create(username: "temerity", password: "123456")


#Tracks
midnighthour = Track.create(title: "Midnight Hour", lyrics: "I'm gonna wait 'till the midnight hour / That's when my love come tumbling down
I'm gonna wait 'till the midnight hour / When there' no one else around / I'm gonna take you, girl, and hold you / And do all things I told you, in the midnight hour", album_id: 1, artist_id: 1)

#Artists
roxymusic = Artist.create(name: "Roxy Music")
robertaflack = Artist.create(name: "Roberta Flack")


#Albums
fleshnblood = Album.create(title: "Flesh + Blood", artist_id: 1, year: 1980)
avalon = Album.create(title: "Avalon", artist_id: 1, year: 1982)