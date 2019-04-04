class Artist < ApplicationRecord

  validates :name, presence: true, uniqueness: true

  has_many :albums,
    class_name: :Album,
    foreign_key: :artist_id

  has_many :tracks,
    class_name: :Track,
    foreign_key: :artist_id

  has_one_attached :photo

end