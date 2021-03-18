# Lift Stuff

## Symfonycast

- [x] JavaScript for PHP Geeks
- [X] JavaScript for PHP Geeks: ES6/ES2015 (New JavaScript)
- [X] JavaScript for PHP Geeks: Webpack for Module Loading Awesomeness
## Setup

**Setup parameters.yml**

First, make sure you have an `app/config/parameters.yml`
file (you should). If you don't, copy `app/config/parameters.yml.dist`
to get it.

Next, look at the configuration and make any adjustments you
need (like `database_password`).

**Download Composer dependencies**

Make sure you have [Composer installed](https://getcomposer.org/download/)
and then run:

```
composer install
```

You may alternatively need to run `php composer.phar install`, depending
on how you installed Composer.

**Setup the Database**

Again, make sure `app/config/parameters.yml` is setup
for your computer. Then, create the database and the
schema!

```
php bin/console doctrine:database:create
php bin/console doctrine:migrations:migrate
php bin/console doctrine:fixtures:load
```

If you get an error that the database exists, that should
be ok. But if you have problems, completely drop the
database (`doctrine:database:drop --force`) and try again.

**Start the built-in web server**

You can use Nginx or Apache, but the built-in web server works
great:

```
php bin/console server:run
```

Now check out the site at `http://localhost:8000`

**Setup node.js and npm/yarn**
Download [node.js](https://nodejs.org/en/download/) 

Install npm [npm](https://www.npmjs.com/get-npm) or [yarn](https://yarnpkg.com/getting-started/install)

Install packages with 

```
npm/yarn install
```
