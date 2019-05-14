class Api::ArtistsController < ApplicationController
  def show
    @artist = Artist.find_by(id: params[:id])
  end

  def index
    if params[:searchTerm]
      @artists = Artist.where("lower(name) LIKE ?", "#{params[:searchTerm].downcase}%").limit(3)
    else
      @artists = Artist.where("name like '#{params[:char]}%'")
    end
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