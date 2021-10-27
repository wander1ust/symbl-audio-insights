import React, { useState, useEffect } from 'react';
import { Typography, Button, Divider } from '@material-ui/core';
const axios = require('axios');

const Sentiment = (props) => {
  const [sentiment, setSentiment] = useState(null);
  const [sentimentCount, setSentimentCount] = useState(null);
  const [isCurrentView, setIsCurrentView] = useState(false);
  const {url, setUrl} = props;

  const renderSentimentWordCloud = async (e) => {
    e.preventDefault();
    fetchData('sentiment').then(async (sentiment) => {
          setSentiment(await sentiment);
          setUrl(await sentiment);
    })    
  }  

  const printSentimentCount = () => {
    fetchData('sentimentCount').then(async (sentimentCount) => {
          setSentimentCount(await sentimentCount);
          console.log(`sentimentCount: ${sentimentCount}`)
    })      
  }  

 //  const breakDownSentimentCount = () => {
 //  	sentimentCount.map(sentiment => {
	// 	Object.keys(sentiment).map((key, index) => {
	// 	  return <p>key: sentiment[key]</p>
	// 	});
	// })
	   	// <p>Positives: ${sentimentCount[0]['positives']}</p>
		   //  	<p>Positives: sentimentCount[1]['negatives']</p>
		   //  	<p>Positives: sentimentCount[2]['neutrals']</p>
  // }  	

 const counts = () => {
 	if (sentimentCount) {
 		let arr = [];
 		// let obj = {};
 		sentimentCount.map((s) => {
 			arr.push(<span className='sentimentLabel'>{s.type}: {s.count} </span>);
 			// obj[s.type] = <span className='sentimentLabel'>{s.type}: {s.count} </span>;
 			// s.type {key: sentimentCount[i]['count']}
 		})
 		return arr;
 		// return {
 		// 	positive: sentimentCount[0]['count'],
 		// 	negative: sentimentCount[1]['count'],
 		// 	neutral: sentimentCount[2]['count']
 		// }
 	}
 } 

 const getHighestSentimentByCount = () => {
 	if (sentimentCount) {
		let sortedByAscending = [];
	 	sortedByAscending = sentimentCount.sort((a, b) => b.count - a.count);	
	 	return sortedByAscending[0]['type']; 		
 	}
 }

 const getSentimentScore = (sentimentType) => {
	switch (sentimentType) {
	  case 'positives':
	    return <span>&#128516;</span>
	    break;
	  case 'negatives':
	  	return <span>&#128533;</span>
	  	break;
	  case 'neutrals':
	  	return <span>&#128533;</span>
	  	break;	
 	}
 }
 

  const fetchData = async (key) => {
      const image = await fetch('/api/wordCloud')
        .then(res => res.json())
        .then(res => res.message[key]);  
        console.log(`fetchData called`);
      return image; 
  };   

  const handleSentimentClick = () => {
	  props.setScreenView('sentiment');
	  setIsCurrentView(true);
  }

  useEffect(() => {
    printSentimentCount();
    // getHighestSentimentByCount();
  }, [])    

  return (
  	<div class="sentiment"> 
    {/*<Button type="submit" variant={isCurrentView ? 'contained' : 'outlined'} color='primary' onClick={handleSentimentClick}> Get Sentiment Score </Button>*/}
  	{props.screenView &&
	  	<>
	  		
		    <p>{!sentimentCount ? 'Loading Sentiment Insights...' : ''}</p>
		    
<>
		    {sentimentCount && 
		    	<>
		    	{counts().map(x => {return x})}

		    	<br/>
		     	 <img class='pie-chart' crossOrigin="anonymous" height="320" width="550" src={`https://quickchart.io/chart?c={type:'pie',data:{labels:['Positive','Neutral', 'Negative'], datasets:[{data:[${sentimentCount[2]['count']},${sentimentCount[0]['count']},${sentimentCount[1]['count']}]}]}}`} /> 
		     	 <h2>Overall Sentiment Score: {getSentimentScore(getHighestSentimentByCount())}</h2>
		    	</>

		     // sentimentCount.map(s => {
			    // JSON.stringify(s)
			    // })
		     // breakDownSentimentCount() 
		   
		    	
		    } </>
	
		 
	  	</>
  	}
  </div> 
  )
}

export default Sentiment;