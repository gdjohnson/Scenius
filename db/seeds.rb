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
Annotation.destroy_all

#Users
graham = User.create(username: "graham", password: "password")
guest = User.create(username: "temerity", password: "123456")

#Artists
roxymusic = Artist.create(  name: "Roxy Music", 
                            image_url: "https://pixel.nymag.com/imgs/daily/vulture/2019/03/20/20-roxy-music.w700.h700.jpg", 
                            bio: Nokogiri::HTML(open("https://en.wikipedia.org/wiki/Roxy_Music")).css("table.infobox")[0].next_element.text)         
robertaflack = Artist.create(name: "Roberta Flack", 
                            image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Roberta_Flack_1971.jpg/640px-Roberta_Flack_1971.jpg",
                            bio: Nokogiri::HTML(open("https://en.wikipedia.org/wiki/Roberta_Flack")).css("table.infobox")[0].next_element.text)
brianeno = Artist.create(   name: "Brian Eno", 
                            image_url: "https://i1.wp.com/www.classicrockhistory.com/wp-content/uploads/2018/04/Brian_Eno_-_TopPop_1974_09.png?resize=680%2C407&ssl=1",
                            bio: Nokogiri::HTML(open("https://en.wikipedia.org/wiki/Brian_Eno")).css("table.infobox")[0].next_element.text)
bryanferry = Artist.create( name: "Bryan Ferry", 
                            image_url: "https://cdn.shopify.com/s/files/1/2508/8586/t/6/assets/description_image_bryan-ferry.jpg?4903922262114959621",
                            bio: Nokogiri::HTML(open("https://en.wikipedia.org/wiki/Bryan_Ferry")).css("table.infobox")[0].next_element.text)
johncale = Artist.create(   name: "John Cale", 
                            image_url: "https://media.ntslive.co.uk/crop/670x670/ea62d443-9f73-45d2-b49d-96e736126806_1510617600.png",
                            bio: Nokogiri::HTML(open("https://en.wikipedia.org/wiki/John_Cale")).css("table.infobox")[0].next_element.text)

# # ALBUMS # #

# Roxy Music
fleshnblood = Album.create(title: "Flesh + Blood", 
                        artist_id: roxymusic.id, 
                        year: 1980, 
                        background_photo: "https://t2.genius.com/unsafe/1840x280/https%3A%2F%2Fimages.genius.com%2F4dadc556a6ccb1100b6502baf84ea1c3.1000x1000x1.jpg",
                        artwork_url: "https://upload.wikimedia.org/wikipedia/en/thumb/7/71/Flesh_and_Blood_album_cover.jpg/220px-Flesh_and_Blood_album_cover.jpg")
avalon = Album.create(  title: "Avalon", 
                        artist_id: roxymusic.id, 
                        year: 1982, 
                        background_photo: "https://t2.genius.com/unsafe/1840x280/https%3A%2F%2Fimages.genius.com%2F2d86de3da03efb9016ba82c224f60598.1000x1000x1.jpg", 
                        artwork_url: "https://upload.wikimedia.org/wikipedia/en/thumb/9/92/Avalon_album_cover.jpg/220px-Avalon_album_cover.jpg")
stranded = Album.create(title: "Stranded", 
                        artist_id: roxymusic.id, 
                        year: "1973", 
                        background_photo: "https://t2.genius.com/unsafe/1170x360/https%3A%2F%2Fimages.genius.com%2F078c67b42900c6547ca5ad7281ffbf4e.1000x1000x1.jpg", 
                        artwork_url: "https://upload.wikimedia.org/wikipedia/en/thumb/d/d9/Roxy_Music-Stranded.jpg/220px-Roxy_Music-Stranded.jpg")
siren = Album.create(   title: "Siren", 
                        artist_id: roxymusic.id,
                        year: "1975",
                        background_photo: "https://t2.genius.com/unsafe/1270x360/https%3A%2F%2Fimages.genius.com%2F4817864a3a8f58994d9ab1e4b8e421a5.1000x1000x1.jpg", 
                        artwork_url: "https://upload.wikimedia.org/wikipedia/en/thumb/a/ad/Roxysiren.jpg/220px-Roxysiren.jpg")
manifesto = Album.create(title: "Manifesto", 
                        artist_id: roxymusic.id, 
                        background_photo: "https://t2.genius.com/unsafe/1270x280/https%3A%2F%2Fimages.genius.com%2Fbe7ae4866efed32f7cc2f5113ee038ad.1000x1000x1.jpg",  
                        year: "1979", 
                        artwork_url: "https://upload.wikimedia.org/wikipedia/en/thumb/e/e2/Roxy_music-manifesto.jpg/220px-Roxy_music-manifesto.jpg")
fypleasure = Album.create(title: "For Your Pleasure", 
                        artist_id: roxymusic.id, 
                        year: "1973", 
                        background_photo: "https://t2.genius.com/unsafe/1270x280/https%3A%2F%2Fimages.genius.com%2F23dc23a01ba047ff489c6c797873a9fe.1000x1000x1.jpg",
                        artwork_url: "https://upload.wikimedia.org/wikipedia/en/thumb/2/27/Roxy_Music_-_For_Your_Pleasure.png/220px-Roxy_Music_-_For_Your_Pleasure.png")

# Brian Eno
warmjets = Album.create(title: "Here Come the Warm Jets", 
                        artist_id: brianeno.id, 
                        year: "1974", 
                        background_photo: "https://t2.genius.com/unsafe/1170x360/https%3A%2F%2Fimages.genius.com%2Fbbfbbd9d02af2c1f36c436a831e3fda8.1000x1000x1.jpg",
                        artwork_url: "https://upload.wikimedia.org/wikipedia/en/thumb/1/13/Warmjetsvinyl.jpg/220px-Warmjetsvinyl.jpg")
tigermntn = Album.create(title: "Taking Tiger Mountain (By Strategy)", 
                        artist_id: brianeno.id, 
                        year: "1974", 
                        background_photo: "https://t2.genius.com/unsafe/1170x360/https%3A%2F%2Fimages.genius.com%2Fa2a9cf0f077c3210a533ce42827a468e.1000x1000x1.jpg", 
                        artwork_url: "https://upload.wikimedia.org/wikipedia/en/thumb/7/70/Tigermountaineno.jpg/220px-Tigermountaineno.jpg")
agw = Album.create(     title: "Another Green World", 
                        artist_id: brianeno.id, 
                        year: "1975",  
                        background_photo: "https://t2.genius.com/unsafe/1170x360/https%3A%2F%2Fimages.genius.com%2F975848091bcd930bf7202ecb025b1da8.1000x1000x1.jpg",
                        artwork_url: "https://upload.wikimedia.org/wikipedia/en/thumb/9/92/Another_Green_World.jpg/220px-Another_Green_World.jpg")
aftersci = Album.create(title: "Before and After Science", 
                        artist_id: brianeno.id, 
                        year: "1977",  
                        background_photo: "https://t2.genius.com/unsafe/1170x360/https%3A%2F%2Fimages.genius.com%2F35fb0bd273879a4c51bdd1fc7d0d9690.1000x1000x1.jpg",
                        artwork_url: "https://upload.wikimedia.org/wikipedia/en/thumb/9/96/Beforeandafterscience.jpg/220px-Beforeandafterscience.jpg")

# Bryan Ferry
boysngirls = Album.create(title: "Boys and Girls", 
                        artist_id: bryanferry.id, 
                        year: "1985", 
                        background_photo: "https://t2.genius.com/unsafe/1170x280/https%3A%2F%2Fimages.genius.com%2F63f8e9b7ba81d7eec388bed5af116128.1000x1000x1.jpg", 
                        artwork_url: "https://upload.wikimedia.org/wikipedia/en/thumb/d/dd/Boys_and_Girls_Cover.jpg/220px-Boys_and_Girls_Cover.jpg")

# Roberta Flack
firsttake = Album.create(title: "First Take", 
                        artist_id: robertaflack.id, 
                        year: "1969", 
                        background_photo: "https://t2.genius.com/unsafe/1170x360/https%3A%2F%2Fimages.genius.com%2F2e96571ef10745e8dc8793852753ad63.640x640x1.jpg", 
                        artwork_url: "https://upload.wikimedia.org/wikipedia/en/f/fe/Flack.first.take.jpg")
killing = Album.create(title: "Killing Me Softly", 
                        artist_id: robertaflack.id, 
                        year: "1973",  
                        background_photo: "https://t2.genius.com/unsafe/1170x360/https%3A%2F%2Fimages.genius.com%2Fbe53ef6a19e6db2c7ef493841c447dce.1000x1000x1.jpg",
                        artwork_url: "https://upload.wikimedia.org/wikipedia/en/e/e7/Killing_me_softly_%28album_cover%29.jpg")

# John Cale
paris = Album.create(   title: "Paris 1919", 
                        artist_id: johncale.id, 
                        year: "1973",  
                        background_photo: "https://t2.genius.com/unsafe/1170x360/https%3A%2F%2Fimages.genius.com%2F7e578cfaee414a4028a89bf9fc883e3a.1000x1000x1.jpg",
                        artwork_url: "https://upload.wikimedia.org/wikipedia/en/thumb/b/bf/JohnCaleParis1919.jpg/220px-JohnCaleParis1919.jpg")
helen = Album.create(   title: "Helen of Troy", 
                        artist_id: johncale.id, 
                        year: "1975",  
                        background_photo: "https://t2.genius.com/unsafe/1170x360/https%3A%2F%2Fimages.genius.com%2F26d542b2ec21215c6bfff8faf8cae2c7.1000x1000x1.jpg",
                        artwork_url: "https://upload.wikimedia.org/wikipedia/en/thumb/5/5f/John_Cale_Helen_of_Troy.JPG/220px-John_Cale_Helen_of_Troy.JPG")


# Album.create(title: "", artist_id: , year: "", artwork_url: "")


# # TRACKS # #
overyou = Track.create(     title: "Over You", 
                            poster_id: guest.id, 
                            album_id: fleshnblood.id, 
                            artist_id: roxymusic.id, 
                            genre_tag: "Pop", 
                            lyrics: File.read(Rails.root + 'db/lyrics/overyou.txt'), 
                            audio_link: "https://www.youtube.com/watch?v=Lm84LZF66_w")

avalon = Track.create(      title: "Avalon", 
                            poster_id: guest.id, 
                            album_id: avalon.id, 
                            artist_id: roxymusic.id, 
                            genre_tag: "Pop", 
                            lyrics: File.read(Rails.root + 'db/lyrics/avalon.txt'),
                            audio_link: "https://www.youtube.com/watch?v=bpA_5a0miWk")

softly = Track.create(      title: "Killing Me Softly",
                            poster_id: guest.id,
                            album_id: killing.id,
                            artist_id: robertaflack.id,
                            genre_tag: "Jazz",
                            lyrics: File.read(Rails.root + 'db/lyrics/softly.txt'),
                            audio_link: "https://www.youtube.com/watch?v=5OyM0R5uRPQ")

midnight = Track.create(    title: "Midnight Hour",  
                            poster_id: guest.id, 
                            album_id: fleshnblood.id, 
                            artist_id: roxymusic.id, 
                            genre_tag: "Pop", 
                            lyrics: File.read(Rails.root + 'db/lyrics/midnight.txt'),
                            audio_link: "https://www.youtube.com/watch?v=Gp7UlPMIgQc")

paris1919 = Track.create(   title: "Paris 1919",
                            poster_id: guest.id,
                            album_id: paris.id,
                            artist_id: johncale.id,
                            genre_tag: "Rock",
                            lyrics: File.read(Rails.root + 'db/lyrics/paris.txt'),
                            audio_link: "https://www.youtube.com/watch?v=q5YHqWqhFkU")

backwater = Track.create(   title: "Backwater", 
                            poster_id: guest.id, 
                            album_id: aftersci.id, 
                            artist_id: brianeno.id, 
                            genre_tag: "Experimental", 
                            lyrics: File.read(Rails.root + 'db/lyrics/backwater.txt'), 
                            audio_link: "https://www.youtube.com/watch?v=YitVQuOBuLc")
                        
andalucia = Track.create(   title: "Andalucia",
                            poster_id: guest.id,
                            album_id: paris.id,
                            artist_id: johncale.id,
                            genre_tag: "Rock",
                            lyrics: File.read(Rails.root + 'db/lyrics/andalucia.txt'),
                            audio_link: "https://www.youtube.com/watch?v=r7iLFuapeY8")

face = Track.create(      title: "The First Time Ever I Saw Your Face",
                            poster_id: guest.id,
                            album_id: firsttake.id,
                            artist_id: robertaflack.id,
                            genre_tag: "Jazz",
                            lyrics: File.read(Rails.root + 'db/lyrics/face.txt'),
                            audio_link: "https://www.youtube.com/watch?v=r9jmusgMgro")                         

morethanthis = Track.create(title: "More Than This", 
                            poster_id: guest.id, 
                            album_id: avalon.id, 
                            artist_id: roxymusic.id, 
                            genre_tag: "Pop", 
                            lyrics: File.read(Rails.root + 'db/lyrics/morethanthis.txt'), 
                            audio_link: "https://www.youtube.com/watch?v=kOnde5c7OG8")

greylagoons = Track.create( title: "Grey Lagoons",
                            poster_id: guest.id, 
                            album_id: fypleasure.id, 
                            artist_id: roxymusic.id, 
                            genre_tag: "Pop", 
                            lyrics: File.read(Rails.root + 'db/lyrics/greylagoons.txt'), 
                            audio_link: "https://www.youtube.com/watch?v=gaYfjouag7w")