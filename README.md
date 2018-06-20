# tree-challenge

## Overview
Demonstrate ​knowledge ​of ​several ​technologies, ​including ​databases, ​backend ​design, ​and ​UI/UX ​by
creating ​a ​live-updating ​tree ​view ​as ​a ​web ​application.

## Dependencies
### Client
* @material-ui/core
* @material-ui/icons
* material-ui
* react
* react-modal
* socket.io-client
### Server
* body-parser
* express
* sequelize
* sequelize-cli
### Production
* Heroku
* JawsDB
## Installation
### Install Locally
```
git clone https://github.com/jessicacord/tree-challenge.git
cd tree-challenge
yarn install
cd ../client
yarn install
cd ..
yarn build
```
### .env File
1. Create a `.env` file in the root directory and define your database credentials:
```
  REACT_APP_DB_USERNAME="your_username"
  REACT_APP_DB_PASSWORD="your_password"
```
2. Edit any of the values in the brackets above to coordinate with your MySQL Database.
### Setup Database
1. Drop Database
```
sequelize db:drop
```
2. Add Database
```
sequelize db:create
```
3. Add Tables
```
sequelize db:migrate
```

### Command
```
killall node
yarn start
```
## Requirements
### Basic
- [x] The ​tree ​should ​contain ​a ​group ​of ​nodes, ​with ​a main ​(root) ​node ​that ​can ​have ​any ​number ​of ‘factories’.
- [x] These ​factory ​nodes ​can ​in ​turn ​generate ​a ​set amount ​of ​random ​numbers ​(up ​to ​15), represented ​as ​child ​nodes ​of ​their ​respective factories.
- [x] Factories ​and ​children ​should ​be ​created through ​some ​means ​of ​user ​input ​(right ​click, button ​press, ​etc) ​specifying ​the ​number ​of children ​to ​generate ​(up ​to ​15) ​and ​the ​ranges ​of those ​children.  
- [x] Factories ​should ​have ​an ​adjustable ​name assigned ​to ​them, ​be ​removable, ​and ​have ​an adjustable ​lower ​and ​upper ​bound ​for ​the random ​number ​generation.
- [x] Use ​any ​programming ​languages ​and front-end ​design ​styles ​of ​your ​choosing ​to create ​the ​project.
- [x] All ​users ​should ​see ​any ​changes ​made ​to the ​tree ​immediately ​across ​browsers without ​refreshing ​or ​polling.
- [x] The ​state ​of ​the ​tree ​should ​remain persistent; ​reloading ​should ​not ​undo ​any state.
- [x] All ​of ​a ​factory’s ​existing ​child ​nodes ​should be ​removed ​upon ​each ​new ​generation.
- [x] Your ​project ​should ​be ​secure, ​validate inputs, ​and ​protect ​against ​injections.
- [x] Your ​project ​should ​be ​hosted ​on ​the ​web using ​a ​service ​such ​as ​Amazon ​AWS ​or Heroku ​to ​run ​your ​submission.
- [x] The ​project ​should ​exhibit ​both ​a ​frontend and ​backend ​codebase ​built ​by ​you.
- [x] Use ​a ​database ​on ​your ​backend, ​not ​Firebase.