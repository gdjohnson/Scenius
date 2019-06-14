require 'nokogiri'
require 'open-uri'

class ApplicationController < ActionController::Base
    helper_method :current_user, :signed_in?, :get_bio

    def get_bio(artist)
        
        i=0
        while i < artist.length
          if i == 0 || artist[i-1] == ' '
            artist[i] = artist[i].upcase
          end
          i+=1
        end
        url = artist.gsub(' ', '_')

        begin
            page = Nokogiri::HTML(open("https://en.wikipedia.org/wiki/#{url}"))
        rescue
            begin
                page = Nokogiri::HTML(open("https://en.wikipedia.org/wiki/#{url}_(band)"))
            rescue
                begin
                    page = Nokogiri::HTML(open("https://en.wikipedia.org/wiki/#{url}_(artist)"))
                rescue
                    page = nil
                end
            end
        end
                 
        if page.nil?
            bio_text = "No biography available."
        else
            bio_text = page.css("table.infobox")[0].next_element.text
        end
    
        return bio_text + ' (courtesy of Wikipedia)'
    end

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
