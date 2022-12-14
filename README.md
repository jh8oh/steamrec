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