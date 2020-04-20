abort('Please run this using `bundle exec rake`') unless ENV["BUNDLE_BIN_PATH"]
require 'html-proofer'

desc "Build the site for production"
task :build do
  sh "JEKYLL_ENV=production bundle exec jekyll build"
end

desc "Delete the _site directory"
task :clean do
  sh "rm -rf _site/"
end

desc "Test the website"
task :test => [:clean, :build] do
  options = {
    :assume_extension => true,
    :check_external_hash => true,
    :check_favicon => true,
    :check_html => true,
    :check_img_http => true,
    :check_opengraph => true,
    :disable_external => true
  }
  begin
    HTMLProofer.check_directory("./_site", options).run
  rescue => msg
    puts "#{msg}"
  end
end
