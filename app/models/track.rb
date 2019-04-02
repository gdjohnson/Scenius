class Track < ApplicationRecord

  validates :title, presence: true, uniqueness: true
  validates :poster_id, :album_id, :artist_id, presence: true

  belongs_to :poster,
    class_name: :User,
    foreign_key: :poster_id

  belongs_to :artist,
    class_name: :Artist,
    foreign_key: :artist_id

  belongs_to :album,
    class_name: :Album,
    foreign_key: :album_id


end