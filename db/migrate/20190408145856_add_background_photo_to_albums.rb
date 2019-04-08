class AddBackgroundPhotoToAlbums < ActiveRecord::Migration[5.2]
  def change
    add_column :albums, :background_photo, :string
  end
end
