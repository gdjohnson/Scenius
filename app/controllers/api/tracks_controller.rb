class Api::TracksController < ApplicationController
  before_action :ensure_signed_in, only: [:create]

  def show
    @track = Track.find(params[:id])
  end

  def index
    if params[:searchTerm]
      trackHits = Track.where("lower(title) LIKE ?", "%#{params[:searchTerm].downcase}%").limit(10)
      
      albumHits = []
      Album.where("lower(title) LIKE ?", "%#{params[:searchTerm].downcase}%").limit(10).each do |album|
        if album.tracks.length > 0
          album.tracks.each do |track|
            albumHits.push(track)
          end
        end
      end

      artistHits = [] 
      Artist.where("lower(name) LIKE ?", "%#{params[:searchTerm].downcase}%").limit(10).each do |artist|
        if artist.albums.length > 0
          artist.albums.each do |album|
            if album.tracks.length > 0
              album.tracks.each do |track|
                albumHits.push(track)
              end
            end
          end
        end
      end
      
      allTracks = trackHits + albumHits + artistHits

      @tracks = allTracks[0, 10]
    else
      @tracks = Track.all
    end
  end

  
  def create

    artist = Artist.find_by(name: params[:track][:artist])
    if artist.nil?
      artist = Artist.new(name: params[:track][:artist])
      artist.bio = get_bio(params[:track][:artist])
      artist.save
    end

    album = Album.find_by(title: params[:track][:album])
    if album.nil?
      album = Album.new(title: params[:track][:album], artist_id: artist.id)
      album.save
    end

    params[:track].delete("album")
    params[:track].delete("artist")
    params[:track].delete("submitted")

    @track = Track.new(track_params)
    @track.artist_id = artist.id
    @track.album_id = album.id

    if @track.save
      render :show
    else
      render json: @track.errors.full_messages, status: 422
    end
  end

  def update
    @track = Track.find(params[:id])
    if @track.update_attributes(track_params)
      render :show
    else
      render json: @track.errors.full_messages, status: 422
    end
  end

  def track_params
    params.require(:track).permit(:title, 
                                  :lyrics, 
                                  :poster_id, 
                                  :album_id, 
                                  :artist_id, 
                                  :genre_tag, 
                                  :audio_link,
                                  :bio,
                                  :searchTerm)
  end
end