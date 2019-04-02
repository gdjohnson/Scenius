# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


# Drop the database and start over if you need fresh ID nums
Album.delete_all
User.delete_all
Artist.delete_all

#Users
graham = User.create(username: "graham", password: "123456")
guest = User.create(username: "temerity", password: "123456")

#Artists
roxymusic = Artist.create(name: "Roxy Music")
robertaflack = Artist.create(name: "Roberta Flack")

#Albums
fleshnblood = Album.create(title: "Flesh + Blood", artist_id: 1, year: 1980, artwork_url: "https://upload.wikimedia.org/wikipedia/en/thumb/7/71/Flesh_and_Blood_album_cover.jpg/220px-Flesh_and_Blood_album_cover.jpg")
avalon = Album.create(title: "Avalon", artist_id: 1, year: 1982, artwork_url: "https://upload.wikimedia.org/wikipedia/en/thumb/9/92/Avalon_album_cover.jpg/220px-Avalon_album_cover.jpg")