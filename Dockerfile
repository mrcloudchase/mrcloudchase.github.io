# Use a Ruby image with the appropriate version for Jekyll
FROM ruby:3.0

# Set the working directory in the container
WORKDIR /app

# Install Jekyll and Bundler
RUN gem install jekyll bundler

# Copy the current directory contents into the container
COPY . .

# Install dependencies specified in the Gemfile
RUN bundle install

# Expose port 4000 for Jekyll server
EXPOSE 4000

# Run Jekyll server by default
CMD ["bundle", "exec", "jekyll", "serve", "--host", "0.0.0.0"]
