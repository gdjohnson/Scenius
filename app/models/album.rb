class Album < ApplicationRecord

  validates :title, presence: true, uniqueness: true
  validates :artist_id, presence: true

  has_many :tracks,
    class_name: :Track,
    foreign_key: :album_id

end