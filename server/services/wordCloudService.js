const axios = require('axios');
const fs = require('fs');

const MAX_NUM_WORDS = 200;

const getWordCloudImageUrl = (text, wordCount) => {
  return `https://quickchart.io/wordcloud?removestopWords=true&width=500&height=500&case=lower&text=${removeStopWords(text.toLowerCase())}&maxNumWords=${wordCount}`;
}
const getSentimentWordCloudUrl = (sentiment) => {
  return `https://quickchart.io/wordcloud?case=lower&text=${sentiment}`;
}

const getWordCount = (req, res) => {
  console.log('req.body.wordCount: ' + req.body.wordCount);
  return req.body.wordCount;
}

const removeStopWords = (text) => {
  const textWithoutPunctuation = text.replace(/[\p{P}\p{S}]/gu, '');
  const textArr = textWithoutPunctuation.split(' ');
  const words = new Set(['the', 'please', 'thank', 'you', 'will', 'it', 'to', 'a', 'i', 'okay', 'you', 'your', 'and', 'that', 'but', 'is', "its", 'so', 'for', 'or', 'my', 'we', 'this', 'have', 'in', 'if', 'just', 'can', 'at', 'with', "thats", 'whats', 'am', 'from', 'do', 'now', "what's", 'all', 'me', 'like', 'are', 'also', 'this', 'us', 'be', 'oh', 'sure', 'may', 'of', 'let', 'great', 'good', 'hello', 'yes', 'yeah', 'alright', 'then', 'dont', 'actually', 'probably', 'guys', 'well', 'did', 'was', 'really', 'about', 'again', 'underscore', 'name', 'youd', 'them', 'they', 'see', 'two', 'one', 'zero', 'three', 'four', 'five', 'seven', 'nine', 'adam', 'wilson', 'right', 'correct', 'on', 'our', 'male', 'fans', 'triple', 'first', 'has', 'does', 'anyway', 'yet', 'been', 'because', 'not', 'there', 'no', 'when']);

  const moreWords = new Set(['what', 'know', 'youre', 'elses', 'ourselves', 'going', 'these', 'would', 'think', 'definitely', 'mean', 'were', 'had', 'hi', 'theres', 'say', 'saying']);

  const stopWords = new Set([...words, ...moreWords]);

  const filtered = textArr.map(val => stopWords.has(val) ? null : val);
  // console.log(filtered.join(' '));

  return filtered.join(' ');

  // const words = ['the', 'please', 'thank', 'you', 'will', 'it', 'not', 'to'];
 
  // words.map( word => {
  //   textArr.filter(x => x !== word);
  // })
  // // textArr.filter(x => {
  // //   words.map(word => {
  // //     x !== word
  // //   })
  // // });
  // console.log(textArr.join(' '));
  // return textArr.join(' ');
}

// convert to one of: 
// HTMLImageElement, SVGImageElement, HTMLCanvasElement, HTMLVideoElement, ImageBitmap

function generateWordCloud() {  
  // console.log('run');
  // res.send({ message: 'yo' });
  // const wordCloud = 
  return axios
    .post(`https://quickchart.io/wordcloud`, 
    {
      "format": "png",
      "width": 1000,
      "height": 1000,
      "fontFamily": "sans-serif",
      "fontScale": 15,
      "scale": "linear",
      "format": "svg",
      "text": "But the one that you provided is actually not accepting towards our database."
    })
    .then(data => {
      console.log(`statusCode: ${data.status}`);
      // console.log(JSON.stringify(data));
      return 'waddup';
      // return data;
      // res.send({ message: data });
      // res.status(200).send({ message: "yo" });

      // let buff = Buffer.from(res, 'base64');

      // fs.writeFileSync('wordcloud.png', buff, function (err) {
      //   if (err) return console.log(err);
      // });        
    })
    .catch(error => {
      console.error(error);
    })
    // return wordCloud;
    return 'yikes';
}

// `https://quickchart.io/wordcloud?text=${text}`

module.exports = {
    generateWordCloud: generateWordCloud,
    getWordCloudImageUrl: getWordCloudImageUrl,
    getSentimentWordCloudUrl: getSentimentWordCloudUrl
  }