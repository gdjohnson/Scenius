class User < ApplicationRecord
        
    validates :username, :session_token, presence: true, uniqueness: true
    validates :password_digest, presence: true
    validates :password, length: { minimum: 6 }, allow_nil: true

    after_initialize :ensure_session_token
    attr_reader :password

    has_many :posted_tracks,
        class_name: :Track,
        foreign_key: :poster_id

    has_many :annotations,
        class_name: :Annotation,
        foreign_key: :user_id

    def self.find_by_credentials(username, password)
        user = User.find_by(username: username)
        return nil unless user && user.is_password?(password)
        user
    end

    def password=(password)
        @password = password
        self.password_digest = BCrypt::Password.create(password)
    end

    def reset_session_token!
        self.session_token = SecureRandom::urlsafe_base64(16)
        self.save!
        self.session_token
    end

    def is_password?(password)
        temp = BCrypt::Password.new(self.password_digest)
        temp.is_password?(password)
    end

    private

    def ensure_session_token
        self.session_token ||= SecureRandom::urlsafe_base64(16)
    end
end
