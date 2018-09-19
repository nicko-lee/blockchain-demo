# Blockchain Demo

## Personal reflection

* **setState() is asynchronous** - I learnt a fair bit about the limitations of setState and its asynchronous behavior. This was the most amount of data I've had to manipulate before. Or rather the most rapid updating of state rather than sheer volume of data. I had lots of problems with promises not being resolved in time and hence the UI being buggy as it would not reflect the correct values.

* **Design decision** - So I tried to work around the limitations and learnt how to use callback functions with setState() and that helped a lot but there came a point where I realized I couldn't continue without using Redux. Especially whenever a new block is created it is a new instance and it cannot 'remember' the previous hash. So I tried to setup Redux and designed a simple data model thinking that I would use it for the whole app state. But then I faced other problems. Redux wasn't being updated quick enough at times. So in the end I went with a hybrid where I kept stuff in state but also some things in the Redux store. It really is a piecemeal solution but it works.

* **On calculation complexity and computing difficulty OOM** - I learnt a bit about the limitations of Chrome and about writing more computationally efficient code. Initially I thought I could do the main loop together with a bunch of setStates or dispatches to Redux but then I realized the performance would significantly suffer. So I did a workaround and did the loop in JS and then at then end called on setState or dispatch and this increased performance about 7 fold! In the end I couldn't find a way to make the UI update at the speeds that I needed it to for the visual effect I initially wanted. But hey rapidly updating state 500,000 times in a few seconds I don't know if React can handle that or I am doing something wrong.

## How to start the React Blockchain Demo App
* Simply `git clone` the repo.
* On your machine terminal, `cd` into local directory you cloned the remote repo into.
* Enter `npm install` in your terminal to install all project dependencies.
* Start the development server with `npm start`

## Deployed demo version
What's the point of doing all this "devving" if it only works on localhost? Real devs got their stuff on Chrome/Firefox :)

[Here is the deployed version of my app.](https://baijie-nicko-blockchain-demo.firebaseapp.com/)

