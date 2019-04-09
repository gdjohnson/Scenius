class CreateAnnotations < ActiveRecord::Migration[5.2]
  def change
    create_table :annotations do |t|
      t.text :content, null: false
      t.integer :user_id
      t.integer :track_id
      t.integer :start_idx
      t.integer :end_idx
      
      t.timestamps
    end
    add_index :annotations, :user_id
    add_index :annotations, :track_id
  end
end
