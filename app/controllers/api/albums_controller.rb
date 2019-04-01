class Api::AlbumsController < ApplicationController
  def show
    @album = Album.find_by(id: params[:id])
  end

  def index
    @albums = Album.all
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
    params.require(:album).permit(:title, :artist_id, :year, :artwork_url)
  end
end