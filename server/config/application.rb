require_relative "boot"

require "rails/all"

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module Server
  class Application < Rails::Application
    # Initialize configuration defaults for originally generated Rails version.
        # Your configuration code
        config.middleware.insert_before 0, Rack::Cors do
          allow do
            origins '*'
            resource '*', headers: :any, methods: [:get, :post, :put, :patch, :delete, :options, :head]
          end
        end

        # Additional configuration...
      end
    end
