# :musical_note: Play Anything

Play anything is a web API that can be used to control spotify connect and allow strangers on the internet to control what you music you listen to.


## Setup

1. Run `./bin/setup`
2. [Create an app](https://beta.developer.spotify.com/dashboard/applications) on spotify
3. [Generate an access token](https://developer.spotify.com/web-api/authorization-guide/#authorization-code-flow) using postman (or something)
4. Update your `.env` file with the access token, refresh token and client information.

## Running

1. Run `yarn dev`

## Configuration

* `ENABLE_CONTROL=<true|false>` - Allows the api to control playing and skipping tracks.
* `ENABLE_STATUS=<true|false>` - Allows the api to return your currently playing track.


