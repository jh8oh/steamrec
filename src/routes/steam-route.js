import express from "express";
import axios from "axios";
import queryString from "query-string";

const router = express.Router();
const STEAM_API_URL = "https://api.steampowered.com";
const STEAM_STORE_URL = "https://store.steampowered.com/";

// Get all user owned games
router.get("/api/owned-games", (req, res) => {
  if (req.user === undefined) {
    res.redirect("/");
    return;
  }

  const steamId = req.user.id;
  const url = `${STEAM_API_URL}/IPlayerService/GetOwnedGames/v1/?`;
  const query = queryString.stringify({
    key: process.env.API_KEY,
    steamId,
    include_appinfo: true,
    include_played_free_games: true,
  });

  axios.get(url + query).then((response) => {
    console.log(response.data);
    const filteredData = response.data.response.games.map(
      ({ appid, playtime_forever }) => ({
        appid: appid,
        playtime_minutes: playtime_forever,
      })
    );

    res.json(filteredData);
  });
});

// Get info about a game
router.get("/api/game-info/:appid", (req, res) => {
  if (req.user === undefined) {
    res.redirect("/");
    return;
  }

  const appId = req.params.appid;
  const url = `${STEAM_STORE_URL}/api/appdetails?`;
  const query = queryString.stringify({
    appids: appId,
  });

  axios.get(url + query).then((response) => {
    const data = response.data[appId].data;

    res.json({
      name: data.name,
      img: data.header_image,
      type: data.type,
      desc: data.short_description,
      genre: data.genres.map(({ description }) => ({ name: description })),
      categories: data.categories.map(({ description }) => ({
        name: description,
      })),
    });
  });
});

export default router;
