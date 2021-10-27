const express = require('express');
const app = express(); 
const dotenv = require('dotenv');
dotenv.config();
const PORT = process.env.PORT || 5000; 
const fetch = require('node-fetch');
var path = require('path');

const authenticate = require('./controllers/authenticate.js');
const audioService = require('./services/audioService.js');
const conversationService = require('./services/conversationService.js');
// const { generateWordCloud, yo } = require('./services/wordCloudService.js');
const wordCloudService = require('./services/wordCloudService.js');
// require(path.join(__dirname, , './services/', 'wordCloudService'));
// const catalog = require(path.join(__dirname, '../controllers', 'catalog.controller'));

const { getSpeechToText, extractText, getSentiment, countSentimentTypes } = conversationService;
const { getWordCloudImageUrl, getSentimentWordCloudUrl } = wordCloudService;

let router = express.Router();

router.get('/', function (req, res, next) {
    console.log("Main Router Working");
    // wordCloudService.generateWordCloud().then(wordCloud => {
    //   res.status(200).send({ message: wordCloud});
    // }
});

// middleware
app.use(express.json());
app.use(express.urlencoded());

app.use(router);

let wordCount = 10;

const asyncMiddleware = fn =>
  (req, res, next) => {
    Promise.resolve(fn(req, res, next))
      .catch(next);
  };

router.post('/api/wordCloud', (req, res) => {
  // Logs course sent from front end
  console.log('Word count from server: ');
  console.log('req.body.wordCount: ' + req.body.wordCount);
  wordCount = req.body.wordCount;
  // res.status(200).send({ message: 'reload' });
  // res.send('Word count from server: ' + req.body.wordCount);
});  

// const getWordCloud = () => {
  router.get('/api/wordCloud', asyncMiddleware(async (req, res, next) => { 
    const transcript = await getSpeechToText();
    const wordCloudImageUrl = getWordCloudImageUrl(extractText(transcript), wordCount);
    const audioSentiment = await getSentiment(await getSpeechToText());

      console.log("Main Router Working");
        res.status(200).send({ 
          message: {
            wordCloudImageUrl: wordCloudImageUrl,
            sentiment: getSentimentWordCloudUrl(audioSentiment),
            sentimentCount: countSentimentTypes(audioSentiment)
          }
        });        
  }));   

  router.post('/api/trackers', (req, res) => {
  }) 
// }

// authenticate();
// audioService.postAudio();



// conversationService.getSpeechToText()
// conversationService.getTopics();
// conversationService.getQuestions();
// conversationService.getActionItems();
// conversationService.getFollowUps();

// const transcription = conversationService.getSpeechToText();
// conversationService.getSpeechToText();
// conversationService.getAnalytics();
// conversationService.getConversationData();

// getTopics: getTopics,
// getQuestions: getQuestions,
// getConversationData: getConversationData,
// getAnalytics: getAnalytics,
// getEntities: getEntities

function init() {
}

function getCalendlyUser() {
  let url = 'https://api.calendly.com/users/me';

  let options = {
    method: 'GET',
    headers: {'Content-Type': 'application/json', Authorization: `Bearer ${process.env.CALENDLY_API_KEY}`}
  };

  fetch(url, options)
    .then(res => res.json())
    .then(json => console.log(json))
    .catch(err => console.error('error:' + err));
}

// 404 Error - Resource Not Found
// can't proceed
function getCalendlyEvents() {
  let url = `https://api.calendly.com/scheduled_events/user/${process.env.CALENDLY_USER}`;
  // let url = `https://api.calendly.com/scheduled_events/organization/${process.env.CALENDLY_ORGANIZATION}`;

  let options = {
    method: 'GET',
    qs: {status: 'active'},
    headers: {'Content-Type': 'application/json', Authorization: `Bearer ${process.env.CALENDLY_API_KEY}`}
  };

  fetch(url, options)
    .then(res => res.json())
    .then(json => console.log(json))
    .catch(err => console.error('error:' + err));
}

/* 403 Forbidden Error - can't proceed
  Must verify domain ownership - https://admin.atlassian.com/o/402470k8-c8j1-1k1j-7395-9d4bk54j785j/domains
  */
function getForgeUserProfile() {
  fetch(`https://api.atlassian.com/users/${process.env.FORGE_ACCOUNT_ID}/manage/profile`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${process.env.FORGE_API_KEY}`,
      'Accept': 'application/json'
    }
  })
    .then(response => {
      console.log(
        `Get Profile Response: ${response.status} ${response.statusText}`
      );
      return response.text();
    })
    .then(text => console.log(text))
    .catch(err => console.error(err));
}

// run and listen to server
app.listen(PORT, () => console.log(`Listening on port ${PORT}`)); 

app.timeout = 2040000;

// create a GET route
app.get('/backend', (req, res) => { 
  res.send({ express: 'Connected' }); 
});