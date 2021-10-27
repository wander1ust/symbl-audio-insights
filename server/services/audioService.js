const request = require('request');
const fs = require('fs');
const dotenv = require('dotenv');
dotenv.config();

const authToken = process.env.SYMBL_ACCESS_TOKEN;
// const webhookUrl = WEBHOOK_URL;
const audioUrl = process.env.TECH_SUPPORT_CALL;
const audioFileStream = fs.createReadStream(audioUrl);
const fileSizeInBytes = fs.statSync(audioUrl).size;

const params = {
  'name': "SalesCall",
  'confidenceThreshold': 0.5,
  // 'trackers': [
  //                {
  //                   "name":"Returns",
  //                   "vocabulary":[
  //                      "return",
  //                      "coats",
  //                      "courier company for shipping"
  //                   ]
  //                }
  //             ],
  // 'enableAllTrackers': true,
  'mode': 'phone',
  'detectPhrases': true              
}


const audioOption = {
  url: 'https://api.symbl.ai/v1/process/audio',
  headers: {
    'Authorization': `Bearer ${authToken}`,
    'Content-Type': 'audio/mp3',
    'Content-Length': fileSizeInBytes.toString()
  },
  qs: params,
  json: true,
};

const responses = {
  400: 'Bad Request! Please refer to docs for correct input fields.',
  401: 'Unauthorized. Please generate a new access token.',
  404: 'The conversation and/or it\'s metadata you asked could not be found, please check the input provided',
  429: 'Maximum number of concurrent jobs reached. Please wait for some requests to complete.',
  500: 'Something went wrong! Please contact support@symbl.ai'
}
function postAudio() {
  audioFileStream.pipe(request.post(audioOption, (err, response, body) => {
    const statusCode = response.statusCode;
    if (err || Object.keys(responses).indexOf(statusCode.toString()) !== -1) {
      throw new Error(responses[statusCode]);
    }
    console.log('Status code: ', statusCode);
    console.log('Body', response.body);
    console.log('fileSizeInBytes: ', fileSizeInBytes.toString());
  }));
}

module.exports = {postAudio: postAudio}
