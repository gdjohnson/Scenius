class Api::AnnotationsController < ApplicationController
    def show
      @annotation = Annotation.find_by(id: params[:id])
    end
  
    def index
      @annotations = Annotation.all
      render :index
    end
  
    def create
      @annotation = Annotation.new(annotation_params)
  
      if @annotation.save
        render :show
      else
        render json: @annotation.errors.full_messages, status: 422
      end
    end
  
    def update
      @annotation = Annotation.find(params[:id])
      if @annotation.update_attributes(annotation_params)
        render :show
      else
        render json: @annotation.errors.full_messages, status: 422
      end
    end

    def destroy
      @annotation = Annotation.find(params[:id])
      @annotation.destroy
      render :show
    end
  
    def annotation_params
      params.require(:annotation).permit(:start_idx, :end_idx, :content, :user_id, :track_id)
    end
  end