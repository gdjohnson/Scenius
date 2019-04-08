class RemovePhotoUrlFromArtists < ActiveRecord::Migration[5.2]
  def change
    remove_column :artists, :photo_url, :string
  end
end
