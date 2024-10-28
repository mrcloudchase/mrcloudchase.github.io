Jekyll::Hooks.register :posts, :post_init do |post|
  # Access the post title correctly using the data hash
  puts "New post generated: #{post.data['title']}"
end