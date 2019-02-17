# Project Title

CodeClimbers allows a user to team up with a friend to solve common programming questions. Users have the option to create a room or join a room using a code! It allows for two users to be in the same coding room and type in the same editor. The catch is, only one use can type in the editor at a time. This ensures that each user gets a turn at typing and prevents one user from overpowering another user (like what can happen in a normal pair programming situation). The timer is displayed on screen that signals when the switch is about to happen. Also on screen is whose turn it is. During the experience, the users can both run the code and see the output or error messages (using the run button). When they believe that their solution works, they may submit their code (using the submit button), and their code will be sent through a few hidden test cases before sending the users some feedback on how they did!

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

What things you need to install the software and how to install them

```
npm

node.js

2 browser windows or 2 computers
```

### Installing

A step by step series of examples that tell you how to get a development env running

First need to setup the backend (NodeJS)
Navigate to server folder

```
cd server
```

Install Node Packages

```
npm install
```

Now we need to install packages for the front end (Vue)

Navigate to client folder

```
cd ../client
```

Install packages

```
npm install
```

Start the server using

```
npm run serve
```

Navigate to http://localhost:8080 to view the application.


## Built With

* [Vue.js](https://vuejs.org/) - The web framework used
* [Node.js](https://nodejs.org/en/) - The backend framework used
* [Firebase](https://firebase.google.com/) - The database used
* [judge0](https://judge0.com/) - Api used to compile code
