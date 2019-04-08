class AddPhotoToArtists < ActiveRecord::Migration[5.2]
  def change
    add_column :artists, :photo_url, :string
  end
end
