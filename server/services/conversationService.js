const request = require('request');
const axios = require('axios');
const authToken = process.env.SYMBL_ACCESS_TOKEN;
const conversationId = process.env.SYMBL_CONVERSATION_ID;

const url = `https://api.symbl.ai/v1/conversations/${conversationId}/messages?sentiment=true&detectPhrases=true`;

async function getSpeechToText() {
    return axios.get(url, {
        headers: {
            'Authorization': `Bearer ${authToken}`
         }            
    })
    .then(async (response) => {
      const data = await response.data;
      const messages = await response.data.messages;
      const transcript = messages;
      return transcript;
    })
    .catch(function(err){
       console.log(err);              
       return err;
     });
    // return response.data;
}

const extractText = (transcript) => {
    let text = '';
    transcript.map(obj => {
        text += ` ${obj.text}`;
    })
    // remove the first space
    return text.slice(1, text.length + 1); 
}

async function getSentiment(transcript) {
    // const transcription = await getSpeechToText();
    let res = '';
    transcript.map(line => {
        res += ` ${line.sentiment.suggested}`;
    })
    return res;
}

// [{"positives":16},{"negatives":28},{"neutrals":77}]
const countSentimentTypes = (sentiments) => {
    let sentimentsArr = sentiments.split(' ');
    const filterSentimentsBy = (sentimentType) => {
        return sentimentsArr.filter(s => s === sentimentType);
    }
    const positivesCount = filterSentimentsBy('positive').length;
    const negativesCount = filterSentimentsBy('negative').length;
    const neutralsCount = filterSentimentsBy('neutral').length;

    // return [{'positives': positivesCount}, {'negatives': negativesCount}, {'neutrals': neutralsCount}];
    return [{'type': 'positives', 'count': positivesCount}, {'type': 'negatives', 'count': negativesCount}, {'type': 'neutrals', 'count': neutralsCount}];
}

function getActionItems() {
    request.get({
        url: `https://api.symbl.ai/v1/conversations/${conversationId}/action-items`,
        headers: { 'Authorization': `Bearer ${authToken}` },
        json: true
    }, (err, response, body) => {
        console.log(body);
    });    
}

function getFollowUps() {
    request.get({
        url: `https://api.symbl.ai/v1/conversations/${conversationId}/follow-ups`,
        headers: { 'Authorization': `Bearer ${authToken}` },
        json: true
    }, (err, response, body) => {
        console.log(body);
    });    
}

function getTopics() {
    request.get({
        url: `https://api.symbl.ai/v1/conversations/${conversationId}/topics`,
        headers: { 'Authorization': `Bearer ${authToken}` },
        json: true
    }, (err, response, body) => {
        console.log(body);
    });
}

function getQuestions() {
    request.get({
        url: `https://api.symbl.ai/v1/conversations/${conversationId}/questions`,
        headers: { 'Authorization': `Bearer ${authToken}` },
        json: true
    }, (err, response, body) => {
        console.log(body);
    });
}

function getConversationData() {
    request.get({
        url: `https://api.symbl.ai/v1/conversations/${conversationId}`,
        headers: { 'Authorization': `Bearer ${authToken}` },
        json: true
    }, (err, response, body) => {
        console.log(body);
    });    
}

function getAnalytics() {
    request.get({
        url: `https://api.symbl.ai/v1/conversations/${conversationId}/analytics`,
        headers: { 'Authorization': `Bearer ${authToken}` },
        json: true
    }, (err, response, body) => {
        console.log(body);
    });    
}

function getEntities() {
    request.get({
        url: `https://api.symbl.ai/v1/conversations/${conversationId}/entities`,
        headers: { 'Authorization': `Bearer ${authToken}` },
        json: true
    }, (err, response, body) => {
        console.log(body);
    });    
}


module.exports = {
    getSpeechToText: getSpeechToText,
    getActionItems: getActionItems,
    getFollowUps: getFollowUps,
    getTopics: getTopics,
    getQuestions: getQuestions,
    getConversationData: getConversationData,
    getAnalytics: getAnalytics,
    getEntities: getEntities,
    getSentiment: getSentiment,
    extractText: extractText,
    countSentimentTypes: countSentimentTypes
}