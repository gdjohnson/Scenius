class Api::AlbumsController < ApplicationController
  def show
    @album = Album.find_by(id: params[:id])
  end

  def index
    if params[:searchTerm]
      @albums = Album.where("lower(title) LIKE ?", "#{params[:searchTerm].downcase}%").limit(3)
    else
      @albums = Album.all
    end
  end

  def create
    @album = Album.new(album_params)

    if @album.save
      render :show
    else
      render json: @album.errors.full_messages, status: 422
    end
  end

  def update
    @album = Album.find(params[:id])
    if @album.update_attributes(album_params)
      render :show
    else
      render json: @album.errors.full_messages, status: 422
    end
  end

  def album_params
    params.require(:album).permit(:title, :artist_id, :year, :artwork_url, :background_photo)
  end
end