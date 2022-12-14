# SteamRec (Server)

A web app that recommends [Steam](https://store.steampowered.com/) apps based on your rating for the apps in your library. Calls the Steam API and stores data in a MongoDB database. Built in order to improve my backend skills so that I could become a full-stack developer.

## Stack & Dependencies

- MongoDB
- Express.js
- Vue 3
  - Vue class components
  - Vuex
- Node.js
- Passport.js
  - Passport Steam

## To-Do

**Login**
- [x] Add login functionality using Passport Steam authentication
- [x] Connect to MongoDB database on login success
- [x] Add logout functionality
- [x] Redirect to dashboard on Logout
- [ ] Front-end
  - [x] Basic HTML and CSS
  - [ ] SteamRec logo

**Populate Database**
- [x] Populate MongoDB apps according to [*app*](https://github.com/jh8oh/steamrec-server#apps) model

**Dashboard - Rate**
- [x] Add API calls to get owned apps from Steam
  - [x] Add sorting functionality of owned apps
- [x] Add ability to rate app - "like" or "dislike"
  - [x] Store ratings in MongoDB according to [*rating*](https://github.com/jh8oh/steamrec-server#ratings) model
  - [x] Add API calls to get previously rated apps
- [x] Front-end
  - [x] Basic HTML and CSS
  - [x] Get cover images from Steam

**Dashboard - Rec**
- [x] Create a rating summary JSON from rated app
  - [ ] Rating summary needs to be refreshed when another app is rated
- [ ] Create recommend filters
  - [ ] Filter by app type
  - [ ] Filter by released
  - [ ] Filter by number of recommendations
  - [ ] Filter by metacritic score
  - [ ] Filter by adult tag
  - [ ] Save filters to localStorage and Vuex
  - [ ] Get filters from localStorage
- [ ] Using the rating summary JSON, get similar apps from MongoDB
  - [ ] Filter out owned apps
  - [ ] Filter out apps according to recommend filters
  - [ ] Limit the amount of apps received from MongoDB
  - [ ] Sort them by score
- [ ] Add a "Get More" functionality
  - [ ] Use previously generated rating summary instead of new one
  - [ ] Filter out previously recommended apps as well
- [ ] Front-end
  - [ ] Basic HTML and CSS
  - [ ] Get cover images from Steam

**Settings**
- [ ] Add ability to delete all ratings the Steam user has in MongoDB
- [ ] Add ability to export all data the Steam user has in MongoDB

**General UI**
- [ ] SteamRec Logo
- [ ] CSS responsiveness for all pages

## Models

### Apps
```json
{
  "_id": "number",
  "name": "string",
  "type": "string",
  "baseGameId": "number|null",
  "developers": "[string]",
  "publishers": "[string]",
  "categories": "[string]|null",
  "genres": "[string]|null",
  "release_date": {
    "coming_soon": "boolean",
    "date": "string"
  },
  "recommendation": "number|null",
  "metacritic": "number|null",
  "adult": "boolean",
  "tags": "[string]"
}
```

### Ratings
```json
{
  "_id": "ObjectId",
  "gameId": "number",
  "userId": "number",
  "rating": "number"
}
```