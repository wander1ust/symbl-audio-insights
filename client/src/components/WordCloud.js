import React, { useState, useEffect } from 'react';
import { Typography, Button, Divider } from '@material-ui/core';
const axios = require('axios');

const WordCloud = (props) => {
  const {url, setUrl} = props;

  const [wordCount, setWordCount] = useState(20);
  const [selected, setSelected] = useState(true);
  const [data, setData] = useState({
      'wordCount': "50"
    });
  // const MAX_WORD_COUNT = '50';
  // const data = props.data;
  // const setData = props.setData;

  const fetchData = async (key) => {
      const image = await fetch('/api/wordCloud')
        .then(res => res.json())
        .then(res => res.message[key]);  
        console.log(`fetchData called`);
      return image; 
  };   

  const setWordCloudImageUrl = () => {
    fetchData('wordCloudImageUrl').then(async (wordCloudImageUrl) => {
          // console.log(`fetchData: ${wordCloudImageUrl}`);  
          setUrl(await wordCloudImageUrl);
    })    
    return [ url, setUrl ];
  }

  // let data = {
  //     'wordCount': '10'
  //   };

  // function data(wordCount) {
  //   return 
  //   {
  //     'wordCount': wordCount
  //   }
  // }

  const updateWordCloud = async (data) => {
    await axios.post('/api/wordCloud',    
    {
      'wordCount': data.wordCount
    }
    )
    .then(response => {
        console.log(`handleChange Response: ${JSON.stringify(response)}`);
    })
    .catch(error => {
        console.log(`handleChange Error: ${error}`);
    });
  }

  const handleChange = async (e) => {
    e.preventDefault();
    let clonedData = { ...data };
    clonedData.wordCount = await e.target.value;  
    const selectedWordCount = await clonedData;  
    setData(selectedWordCount);    
    updateWordCloud(selectedWordCount);
    setWordCloudImageUrl();   
    selectedWordCount === '10' ? setSelected(true) : setSelected(false);
  }    

  const isWordCloudViewSelected = () => {
    return (props.screenView === 'wordCloud');
  }

  const handleClick = () => {
    props.setScreenView('wordCloud');
  }

  useEffect(()=>{
    // setData({
    //   'wordCount': "100"
    // })
    // data.wordCount = MAX_WORD_COUNT;
    console.log('start:' + data.wordCount);
    updateWordCloud({...data});  
    setWordCloudImageUrl();
  }, [])  

  return (
    <div className="word-cloud"> 
       {/*<Button type="submit" variant='outlined' color='success' onClick={handleClick}> Generate Word Cloud </Button> */}
    {props.screenView &&
      <> <br/>
    <label className='dropdown'>Word Count: &nbsp; 
    <select name='wordCount' onChange={handleChange}>      
      <option value='10'> 10 </option>
      <option value='50' selected={selected}> 50 </option>
      <option value='100'> 100 </option>
      <option value='200'> 200 </option>
      <option value='200'> 500 </option>
    </select> 
    </label>

    
    {!url && <><p>Rendering Word Cloud ...</p>

    <img src='https://media.giphy.com/media/52qtwCtj9OLTi/giphy.gif' />    
    </>
  }
  <img crossOrigin="anonymous" src={!url ? null : `${url}`} /> 
    </>     
  }
    </div>   
  
  );
}

export default WordCloud;