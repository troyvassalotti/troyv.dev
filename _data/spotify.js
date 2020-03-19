const axios = require("axios").default;

// https://developer.spotify.com/
// figure out where to host the spotify api page
module.exports = async function() {
  try {
    const response = await axios.get("https://api.spotify.com/v1/users/1222462159");
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
}
