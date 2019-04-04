class Album < ApplicationRecord

  validates :title, presence: true, uniqueness: true
  validates :artist_id, presence: true

  has_many :tracks,
    class_name: :Track,
    foreign_key: :album_id

  belongs_to :artist,
    class_name: :Artist,
    foreign_key: :artist_id

  has_one_attached :artwork

end