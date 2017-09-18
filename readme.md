# BuildingConnected On-site: Frontend Files Challenge
Welcome, we're glad you've joined us today!

## Environment Setup
To get your basic environment up and running, we assume you've already:

1. Cloned this repo, made a copy, and pushed up to a new public Github repo.
3. Installed Docker
4. Obtained AWS Credentials from someone on the team
5. Installed Node v6

Start Mongo via Docker:
```
$ docker-compose up
```
Start the App:
```
$ npm install
$ ACCESS_KEY_ID="<...>" SECRET_ACCESS_KEY="<...>" npm start
```
Browse to [http://localhost:8080](http://localhost:8080)

Backend code changes will immediately restart your server thanks to Nodemon. Front-end changes will require a browser refresh.

## FE Scaffolding

This repo comes with Babel set up to support ES2015 (including module syntax) and React. Webpack is also configured to create and serve up a bundle, with `/client/app.js` as its entry point. `/public/index.html` is the file that gets rendered when you land on [http://localhost:8080](http://localhost:8080). Feel free to use the scaffolding as is or tweak it to your heart's desire, just bear in mind you have limited time so you probably don't want to go too deep down a configuration rabbit hole.

## The Challenge

We've created an API ([documentation here](./server)) for a number of the files explorer features. What we need you to do is to design and hook up a basic UI that will allow the user to:

* Create a folder at the root level
* View folders at the root level
* Create a folder within a folder
* View folders at a nested level
* Toggle folders open and close
* Upload a file at the root level
* Download the file
* Upload a file within a folder

## As you begin...

A few things to keep in mind that our team generally values when we do our own day-to-day work:

* Quality over quantity
* Over-communication
* Code readability and maintainability
* Most important: Always remember that a great customer experience is all that matters

Good luck!
# building-connected-julia-onsite
