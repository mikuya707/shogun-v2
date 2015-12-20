# Shogun #
==========

An online version of the two-player board game [*The Duke*](http://www.catalystgamelabs.com/casual-games/the-duke/). View the complete rules booklet for the original game [here](http://www.catalystgamelabs.com/download/The%20Duke%20Rulebook%20Lo-Res_FINAL.pdf) (PDF).

Check the game out at [shogun-game.herokuapp.com](http://shogun-game.herokuapp.com)! (Note: may not render properly on browsers other than Chrome)


[Tile Movement Reference Sheet](http://www.catalystgamelabs.com/download/Movement%20Reference%20Card_Final.pdf) (PDF)

### Directions for running locally in Node ###

* Install dependencies
```sh
npm install
```
* Set NODE_ENV to development
```sh
export NODE_ENV=development
```
export on every tab running either 'gulp' or 'npm start'
* Run the server
```sh
npm start
```
* Preferred way is to run the server with nodemon
```sh
npm install -g nodemon # if you don't have nodemon installed yet
nodemon --harmony bin/www
```
* Run gulp if you want to recompile static assets when you save a file
```sh
gulp
```
* App will run on **localhost:1337**
