class Api::TracksController < ApplicationController
  before_action :ensure_signed_in, only: [:create]

  def show
    @track = Track.find(params[:id])
  end

  # def load_project
  #   @project = Project.find_by(startChar: params[:startChar])
  # end

  def index
    @tracks = Track.all
  end

  def create
    @track = Track.new(track_params)

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
    params.require(:track).permit(:title, :lyrics, :poster_id, :album_id, 
                                  :artist_id, :genre_tag, :audio_link)
  end
end