class Api::ArtistsController < ApplicationController
  def show
    @artist = Artist.find_by(id: params[:id])
  end

  def index
    @artists = Artist.where("name like '#{params[:char]}%'")
    render :index
  end

  def create
    @artist = Artist.new(artist_params)

    if @artist.save
      render "/api/artists/show"
    else
      render json: @artist.errors.full_messages, status: 422
    end
  end

  def update
    @artist = Artist.find(params[:id])
    
    if @artist.update_attributes(artist_params)
      render :show
    else
      render json: @artist.errors.full_messages, status: 422
    end
  end

  def artist_params
    params.require(:artist).permit(:name, :image_url, :char)
  end
end