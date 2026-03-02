FROM ruby:3.4

WORKDIR /srv/jekyll

RUN gem install bundler -v 2.7.0

COPY Gemfile Gemfile.lock ./
RUN bundle _2.7.0_ install

COPY . .

EXPOSE 4000

CMD ["bundle", "exec", "jekyll", "serve", "--host", "0.0.0.0", "--force_polling"]