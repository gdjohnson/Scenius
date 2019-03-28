class Artist < ApplicationRecord

  validates :name, presence: true, uniqueness: true

  has_many :albums,
    class_name: :Album,
    foreign_key: :album_id

  has_many :tracks,
    class_name: :Artist,
    foreign_key: :artist_id

end