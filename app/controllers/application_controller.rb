class ApplicationController < ActionController::Base
    helper_method :current_user, :signed_in?

    def current_user
        @current_user ||= User.find_by(session_token: session[:session_token])
    end

    def signed_in?
        !!current_user
    end

    def sign_in(user)
        session[:session_token] = user.reset_session_token!
        @current_user = user
    end

    def sign_out
        @current_user.reset_session_token!
        session[:session_token] = nil
    end

    private

    def ensure_signed_in
        unless current_user
            render json: { base: ['Invalid credentials'] }, status: 401
        end
    end

end
