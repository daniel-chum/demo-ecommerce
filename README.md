# Demo E-commerce Platform

Demo live at: [demo.danielchum.com](http://demo.danielchum.com)

# General Info

A 7-page demo e-commerce website with membership where users can
1. List their own products
2. Add products to cart

# Frameworks and technologies used

* Next.js (Export as static HTML and CSS files with code splitted js files)
* Django REST Framework (API for functionality and JWT Authentication)
* Tailwind.css
* Nginx
* Docker
* AWS EC2
* AWS RDS (Postgresql)

# Features
* Performant by default
* SEO Ready
* UI Components
* Standardized Data Hooks
* JWT Authentication (Access Token in memory and Refresh Token in HTTP-only cookie)

# APIs
* Customer Cart
* Product Listing
* Authentication

# Getting started
To get a local copy up and running follow these simple example steps.

### Prerequisites
* npm
* python
* A python virtual environment package
```console.
$ apt-get install python3-venv
```
### Installation
1. Clone the repo
```console.
git clone https://github.com/daniel-chum/demo-ecommerce.git
```
2. Install python packages and run django rest framework
```console.
$ cd demo-ecommerce/monolith-backend
$ python3 -m venv djangoenv
$ source djangoenv/bin/activate
$ cd backend
$ pip install -r requirements.txt
$ python manage.py runserver
```
3. Install NPM packages
```console.
$ cd demo-ecommerce/monolith-ui
$ npm install
$ npm run dev
```
4. Browse localhost:3000 on your browser

# Run on Docker
To run on docker follow these simple example steps.

### Run on developer environment
1. Clone the repo
```console.
git clone https://github.com/daniel-chum/demo-ecommerce.git
```
2. Run docker compose
```console.
$ cd demo-ecommerce
$ docker-compose -f docker-compose.dev.yml up -d --build
```
3. Browse localhost:80 on your browser
### Run on production environment
```console.
$ docker-compose -f docker-compose.yml up -d --build
```

# Testing
```console.
$ cd demo-ecommerce/monolith-backend
$ python3 -m venv djangoenv
$ source djangoenv/bin/activate
$ cd backend
$ python manage.py test
```
# Contact
Daniel Chum - szewen.chum@gmail.com
