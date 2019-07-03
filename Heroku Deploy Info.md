Heroku, Ubuntu, Rails 2.5.1, and Bundler haven't been playing well together. These notes are to log a set of procedures for reliably precompiling assets for deployment.

Bundler 2.0: non-functional
Bundler 2.0.1: non-functional
Bundler 2.0.2: functional, currently in use

Global Ruby: 2.3.1
Local Ruby: 2.5.1

_First, clobber, clean, & precompile assets:_
* `RAILS_ENV=production bundle exec rake assets:clobber`
* `RAILS_ENV=production bundle exec rake assets:clean`
* `RAILS_ENV=production bundle exec rake assets:precompile`

_Commit changes in Git to add newly compiled assets, then push to Heroku._
* `git push heroku master`

_To re-seed the DB:_
* `heroku pg:reset DATABASE` (only drops; does not migrate or reseed)
* `heroku run rails db:migrate`
* `heroku run rails db:seed`