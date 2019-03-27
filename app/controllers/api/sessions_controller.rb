class Api::SessionsController < ApplicationController

    def create
        @user = User.find_by_credentials(params[:username], params[:password])
        if @user
            sign_in(@user)
            render "api/users/show"
        else
            render json: ['Username or password does not exist.'], status: 401
        end
    end

    def destroy
        if current_user
            sign_out
            render json: { message: 'Successfully signed out.'}
        else
            render json: ['No current user'], status: 404
        end
    end

end