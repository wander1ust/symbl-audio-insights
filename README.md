# Symbl Audio Insights

<br/>

## Table of Contents 
**[Installation](#installation)** &nbsp;| &nbsp; **[Configuring your environment](#configuring-your-environment)** &nbsp; | &nbsp; **[Video Demo](#video-demo)** &nbsp;

<br/>

## Installation 
1. Clone this repository
2. Rename **`.env.example`** to **`.env`** and configure the environment variables (see below for more info)
3. Run **`npm run install-all`** from the root directory to install all dependencies
4. Run **`cd server && npm start`** to run the node server on localhost:5000
5. Run **`cd client && npm start`** in a new Terminal tab to start the React app on localhost:3000

<hr/>

### Configuring your environment

In order to generate audio insights from the app, you first need to generate an Access Token from Symbl for authentication. **[Sign up for a free Symbl developer account](https://platform.symbl.ai/#/signup)** to get your Symbl API Credentials and **[follow this guide](https://docs.symbl.ai/docs/developer-tools/authentication/)**. Once you have completed this step, you will need to upload your own audio to Symbl. The audio file format must be one of: audio/wav, audio/mpeg, audio/mp3 or audio/wave, and it must be a raw file with only a Mono Channel. Once you have your audio, set **`AUDIO_URL`** to your audio's file path in **`.env`** (remember, this is the **`.env.example`** template file that you will need to rename to **`.env`** and populate with your own values).



Next, go to **`server/index.js`**, uncomment **`audioService.postAudio()`**, and save the file once. Check the Terminal tab where you started the server. You should see a log outputting the response body. Copy the **`conversationId`** value and paste it into **`.env`**. Comment out **`audioService.postAudio()`** in  **`server/index.js`** (so that it doesn't run again) and save the file. Now the app is ready to generate insights for the audio you've just uploaded. Follow these steps any time you want to process new audio. 

It's a PITA, but these manual steps are necessary because I haven't set up a front end audio file uploader yet.

<br/>


## Video Demo
<a href="https://rebrand.ly/symbl-audio-insights-demo" target="_blank"><img alt="video-thumbnail" src="https://rebrand.ly/insightly-vid-thumbnail" width="650px" height=""/></a>
