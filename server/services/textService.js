const request = require('request');
// set your access token here. See https://docs.symbl.ai/docs/developer-tools/authentication
const authToken = AUTH_TOKEN;

const options = {
  'method': 'POST',
  'url': 'https://api.symbl.ai/v1/process/text',
  'headers': {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${authToken}`
  },
  body: JSON.stringify({
    // <Optional,String| your_meeting_name by default conversationId>
    "name": "Business Meeting",
    // <Optional,double| Minimum required confidence for the insight to be recognized. Value ranges between 0.0 to 1.0. Default value is 0.5.>
    "confidenceThreshold": 0.6,
    // <Optional,boolean| It shows Actionable Phrases in each sentence of conversation. These sentences can be found using the Conversation's Messages API. Default value is false.>
    "detectPhrases": true,
    "messages": [
      {

        // <Optional, object| Duration object containing startTime and/or endTime for the transcript.>, e.g.
        "duration": {
          "startTime": "2020-07-21T16:04:19.99Z",
          "endTime": "2020-07-21T16:04:20.99Z"
        },
        "payload": {
          "content": "Hello.  So this is a live demo that we are trying to give very we are going to show how the platform detects various insights can do transcription in real-time and also the different topics of discussions, which would be generated after the call is over, and they will be an email that will be sent to the inbox.  So that is the idea.  So I am going to do a quick conversation.  I would say where I will demonstrate all of this great catching up.  Thanks for calling good to hear.  From you.  And I would love to hear more about what you have to offer?  I will set up a time and appointment probably sometime tomorrow evening where we can go over the documents that you're providing.  I love all the plants.  I just need to discuss with my family in terms of which one will we go forward with it?  It very excited to hear from you and the discount and look forward to talking sharply.  I have a quick question though.  Is there basically website?  Where I can go to and look at all these details myself.  It will be very helpful.  Can you also share the quotation to me on email so that I can go ahead and talk about it with my other kind of folks in the family?  That's it.  Thanks a lot.  Thanks for calling good catching up.  Talk soon.",
          "contentType": "text/plain"
        },
        // <Optional, object| Information about the User information i.e. name and/or userId, produced the content of this message.>
        "from": {
          "name": "John",
          "userId": "john@example.com"
        }
      }
    ]
  })
};

const responses = {
  400: 'Bad Request! Please refer docs for correct input fields.',
  401: 'Unauthorized. Please generate a new access token.',
  404: 'The conversation and/or it\'s metadata you asked could not be found, please check the input provided',
  429: 'Maximum number of concurrent jobs reached. Please wait for some requests to complete.',
  500: 'Something went wrong! Please contact support@symbl.ai'
}

request(options, function (error, response) {
  const statusCode = response.statusCode;
  if (err || Object.keys(responses).indexOf(statusCode.toString()) !== -1) {
    throw new Error(responses[statusCode]);
  }
  console.log('Status code: ', statusCode);
  console.log('Body', response.body);
});