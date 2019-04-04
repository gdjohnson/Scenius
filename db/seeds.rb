# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


# Drop the database and start over if you need fresh ID nums
Album.destroy_all
User.destroy_all
Artist.destroy_all
Track.destroy_all


#Users
graham = User.create(username: "graham", password: "123456")
guest = User.create(username: "temerity", password: "123456")

#Artists
roxymusic = Artist.create(name: "Roxy Music", image_url: "https://pixel.nymag.com/imgs/daily/vulture/2019/03/20/20-roxy-music.w700.h700.jpg")         
robertaflack = Artist.create(name: "Roberta Flack", image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Roberta_Flack_1971.jpg/640px-Roberta_Flack_1971.jpg")
brianeno = Artist.create(name: "Brian Eno", image_url: "https://i1.wp.com/www.classicrockhistory.com/wp-content/uploads/2018/04/Brian_Eno_-_TopPop_1974_09.png?resize=680%2C407&ssl=1")
bryanferry = Artist.create(name: "Bryan Ferry", image_url: "https://cdn.shopify.com/s/files/1/2508/8586/t/6/assets/description_image_bryan-ferry.jpg?4903922262114959621")
johncale = Artist.create(name: "John Cale", image_url: "https://media.ntslive.co.uk/crop/670x670/ea62d443-9f73-45d2-b49d-96e736126806_1510617600.png")
fela = Artist.create(name: "Fela Kuti / Africa '70", image_url: "https://bocavasionski.files.wordpress.com/2013/05/fela-1-900x594.jpg")


# # ALBUMS # #

# Roxy Music
fleshnblood = Album.create(title: "Flesh + Blood", artist_id: roxymusic.id, year: 1980, artwork_url: "https://upload.wikimedia.org/wikipedia/en/thumb/7/71/Flesh_and_Blood_album_cover.jpg/220px-Flesh_and_Blood_album_cover.jpg")
avalon = Album.create(title: "Avalon", artist_id: roxymusic.id, year: 1982, artwork_url: "https://upload.wikimedia.org/wikipedia/en/thumb/9/92/Avalon_album_cover.jpg/220px-Avalon_album_cover.jpg")
stranded = Album.create(title: "Stranded", artist_id: roxymusic.id, year: "1973", artwork_url: "https://upload.wikimedia.org/wikipedia/en/thumb/d/d9/Roxy_Music-Stranded.jpg/220px-Roxy_Music-Stranded.jpg")
siren = Album.create(title: "Siren", artist_id: roxymusic.id, year: "1975", artwork_url: "https://upload.wikimedia.org/wikipedia/en/thumb/a/ad/Roxysiren.jpg/220px-Roxysiren.jpg")
manifesto = Album.create(title: "Manifesto", artist_id: roxymusic.id, year: "1979", artwork_url: "https://upload.wikimedia.org/wikipedia/en/thumb/e/e2/Roxy_music-manifesto.jpg/220px-Roxy_music-manifesto.jpg")
fypleasure = Album.create(title: "For Your Pleasure", artist_id: roxymusic.id, year: "1973", artwork_url: "https://upload.wikimedia.org/wikipedia/en/thumb/2/27/Roxy_Music_-_For_Your_Pleasure.png/220px-Roxy_Music_-_For_Your_Pleasure.png")

# Brian Eno
warmjets = Album.create(title: "Here Come the Warm Jets", artist_id: brianeno.id, year: "1974", artwork_url: "https://upload.wikimedia.org/wikipedia/en/thumb/1/13/Warmjetsvinyl.jpg/220px-Warmjetsvinyl.jpg")
tigermountain = Album.create(title: "Taking Tiger Mountain (By Strategy)", artist_id: brianeno.id, year: "1974", artwork_url: "https://upload.wikimedia.org/wikipedia/en/thumb/7/70/Tigermountaineno.jpg/220px-Tigermountaineno.jpg")
agw = Album.create(title: "Another Green World", artist_id: brianeno.id, year: "1975", artwork_url: "https://upload.wikimedia.org/wikipedia/en/thumb/9/92/Another_Green_World.jpg/220px-Another_Green_World.jpg")
afterscience = Album.create(title: "Before and After Science", artist_id: brianeno.id, year: "1977", artwork_url: "https://upload.wikimedia.org/wikipedia/en/thumb/9/96/Beforeandafterscience.jpg/220px-Beforeandafterscience.jpg")
thursnoon = Album.create(title: "Thursday Afternoon", artist_id: brianeno.id, year: "", artwork_url: "https://upload.wikimedia.org/wikipedia/en/thumb/1/12/Thursday_Afternoon.jpg/220px-Thursday_Afternoon.jpg1985")

# Bryan Ferry
boysngirls = Album.create(title: "Boys and Girls", artist_id: bryanferry.id, year: "1985", artwork_url: "https://upload.wikimedia.org/wikipedia/en/thumb/d/dd/Boys_and_Girls_Cover.jpg/220px-Boys_and_Girls_Cover.jpg")

# Roberta Flack
firsttake = Album.create(title: "First Take", artist_id: robertaflack.id, year: "1969", artwork_url: "https://upload.wikimedia.org/wikipedia/en/f/fe/Flack.first.take.jpg")
killing = Album.create(title: "Killing Me Softly", artist_id: robertaflack.id, year: "1973", artwork_url: "https://upload.wikimedia.org/wikipedia/en/e/e7/Killing_me_softly_%28album_cover%29.jpg")

# John Cale
paris = Album.create(title: "Paris 1919", artist_id: johncale.id, year: "1973", artwork_url: "https://upload.wikimedia.org/wikipedia/en/thumb/b/bf/JohnCaleParis1919.jpg/220px-JohnCaleParis1919.jpg")
helen = Album.create(title: "Helen of Troy", artist_id: johncale.id, year: "1975", artwork_url: "https://upload.wikimedia.org/wikipedia/en/thumb/5/5f/John_Cale_Helen_of_Troy.JPG/220px-John_Cale_Helen_of_Troy.JPG")

# Fela Kuti
zombie = Album.create(title: "Zombie", artist_id: fela.id, year: "1976", artwork_url: "https://cdn4.pitchfork.com/albums/21157/homepage_large.60263040.jpg")

# Album.create(title: "", artist_id: , year: "", artwork_url: "")


# # TRACKS # #
morethanthis = Track.create(title: "More Than This", lyrics: File.read(Rails.root + 'db/lyrics/morethanthis.txt'), poster_id: guest.id, album_id: avalon.id, artist_id: roxymusic.id, genre_tag: "Pop", audio_link: "https://www.youtube.com/watch?v=kOnde5c7OG8")

overyou = Track.create(title: "Over You", lyrics: File.read(Rails.root + 'db/lyrics/overyou.txt'), poster_id: guest.id, album_id: fleshnblood.id, artist_id: roxymusic.id, genre_tag: "Pop", audio_link: "https://www.youtube.com/watch?v=Lm84LZF66_w")

overyou = Track.create(title: "Avalon", lyrics: File.read(Rails.root + 'db/lyrics/avalon.txt'), poster_id: guest.id, album_id: avalon.id, artist_id: roxymusic.id, genre_tag: "Pop", audio_link: "https://www.youtube.com/watch?v=bpA_5a0miWk")



#Brian Eno
backwater = Track.create(title: "Backwater", lyrics: File.read(Rails.root + 'db/lyrics/backwater.txt'), poster_id: guest.id, album_id: afterscience.id, artist_id: brianeno.id, genre_tag: "Experimental", audio_link: "https://www.youtube.com/watch?v=YitVQuOBuLc")
