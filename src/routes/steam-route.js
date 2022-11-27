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
    const filteredData = response.data.response.games.map(
      ({ appid, name, playtime_forever }) => ({
        id: appid,
        name: name,
        playtime: playtime_forever,
      })
    );;

    res.json(filteredData);
  });
});

export default router;
