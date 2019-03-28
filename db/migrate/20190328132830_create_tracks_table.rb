class CreateTracksTable < ActiveRecord::Migration[5.2]
  def change
    create_table :tracks do |t|
      t.string :title, null: false
      t.text :lyrics, null: false
      t.integer :poster_id, null: false
      t.integer :album_id, null: false
      t.integer :artist_id, null: false
      t.string :genre_tag
      t.string :audio_link

      t.timestamps
    end
    add_index :tracks, :poster_id
    add_index :tracks,  :album_id
    add_index :tracks, :artist_id
  end
end
