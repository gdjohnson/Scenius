class Api::SessionsController < ApplicationController

    def create
        @user = User.find_by_credentials(params[:user][:username], params[:user][:password])

        if @user
            sign_in(@user)
            render '/'
        else
            render json: ['Username or password does not exist.'], status: 401
        end
    end

    def destroy
        sign_out
        render json: { message: 'Successfully signed out.'}
    end

end