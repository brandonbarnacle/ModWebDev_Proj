# Welcome to our React App

This is the react app for Brandon and Patrick's Modern Web Dev Project

## Running the code

In the project directory, you can run:

### `npm install`

If your first time running the code

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.


## What to do when the app opens
If you are using the app for the first time, you will be prompted with a module to log in / sign up. If you have used the site before, you will be asked if you want to stay as the same user or if you would like to change users. Once you are logged in you are taken to the game screen where you will either be placed in an open game and start playing or you will wait for another player to join and then start playing. You then use the up and down arrow to move your paddle. The first player to score wins!

## Things of note
We use back4app for our backend which was not made to handle the amount of requests needed for this project which can lead to the app failing to connect to back4app and crashing on occasion. At the time of turning in this project, our back4app has shut us out of our database and will not let us connect to it, so when you log in to the site you are unable to play the game and the leaderboard scores will not pop up. For our project, we believe we used good tools for each aspect besides for our database to handle the multiplayer data that needed to be sent to each player. Our auth, css style for the site, and WebGL for the game all came together very nice, but back4app was just not made for what we needed to do, at least with our plan.

A final thing to note: our webpack compiles successfully with no warnings and errors. However, if you inspect and go to console you will see some errors there. The first errors are caused by the combination of using WebGL with React. We do not know if these two were supposed to be used together so there are some warnings, but the warnings have no effect and everything runs smooth. The next errors are caused by back4app not allowing us to connect to our database.
