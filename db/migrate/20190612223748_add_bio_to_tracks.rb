class AddBioToTracks < ActiveRecord::Migration[5.2]
  def change
    add_column :artists, :bio, :text
  end
end
