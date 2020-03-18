const axios = require("axios").default;

// https://developer.spotify.com/
// figure out where to host the spotify api page
module.exports = async function() {
  try {
    const response = await axios.get('/user?ID=12345');
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
