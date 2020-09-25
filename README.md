# Spotify Remote Party

If you, like me, like to have a beer with friends over Discord / Zoom / whatever, you probably stumbled over the less-than-ideal solutions for listening to music together remotely. This is a proof-of-concept using Spotify's various APIs, plus a REST + WS middleware, for achieving this in a Web App.

Preliminary testing shows that there is a noticeable delay between the client, which should not matter in the intended scope.

Currently, this project is between the proof-of-concept and development phase, so nothing is really working or even remotely "done right", but that might still be useful to someone.

## Is this production-ready?

**Absolutely not**. Unless you understand the source code, you should _not_ be running this. The code is also not good, so you might not want to learn from this. If you're tinkering around with the Spotify API, this might serve as a more in-depth usage example.

## Parts

The client subproject is a React App - upon startup, it looks for credentials in local storage or document.location, and if none are found, offers up to start the Spotify OAuth Workflow.

If they are found, the credentials are used to obtain an OAuth access token from the Backend, and use that to use the various Spotify APIs and SDKs. A user is picked as "controller" by the backend, which will send updates to the Backend, which broadcasts them to other clients

## Running in localdev

You need:

- node 14 (I recommend using [nvm](https://github.com/nvm-sh/nvm))
- yarn
- A Spotify App, which can be created (here)[https://developer.spotify.com/dashboard/applications]

## Step 1: The Client

First, install all dependencies by running `yarn`. Then, switch to the client directory and

- use `yarn start` to start a local development build, which is available by default under `localhost:1234`
- use `yarn build` to create a build which can be statically hosted, which will be in the `dist/` subfolder.

For production, you might want to set the `BACKEND_URL` environment variable to your desired backend target

| variable      | default                 |                                                  |
| ------------- | ----------------------- | ------------------------------------------------ |
| `BACKEND_URL` | `http://localhost:8000` | base URL for the backend, without trailing slash |

## Step 2: The Backend

In a second terminal, switch to the backend directory and

- use `yarn dev` to run a version of the backend that reloads on source change

Currently, this is the only available command, and you will need to set some environment variables, unless the default fits for your case:

| variable        | default                 |                                                                                                                                                                                                        |
| --------------- | ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `HOST`          | `http://localhost:8000` | The backend needs to know its own public URLs in order to enable the Spotify OAuth workflow                                                                                                            |
| `PORT`          | `8000`                  | the port this server should listen on. Notice how, depending on your setup, this might be different from the port stated in in the `HOST` variable                                                     |
| `CLIENT_ID`     | see source code         | Your Spotify App's client ID from the [developer dashboard](https://developer.spotify.com/dashboard/applications). You _should_ set this to your own client ID.                                        |
| `CLIENT_SECRET` | `undefined`             | Your Spotify App's client _secret_, again available on your developer dashboard. You _must_ set this. Unless you know the secret to the ID in this repository, you also _must_ set your own client ID. |
| `FRONTEND_URL`  | `http://localhost:8000` | To complete the OAuth workflow, the backend needs to know the public URL to the frontend; this also sets CORS headers to ensure usage only with this specified frontend                                |

## Step 3: The Spotify App

On the [dashboard](https://developer.spotify.com/dashboard/applications), create your app and use the cliend ID and secret as detailed above. You also need to specify a list of allowed redirect URLs; these are `${HOST}/receive` for each desired backend available. With the defaults, this URL will be `http://localhost:8000/receive`.
