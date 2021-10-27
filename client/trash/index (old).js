  const fetchData = async () => {
    const data = await fetch('/')
      .then(res => res.json())
      .then(wordCloud => wordCloud.message);  
      // .then(data => async () => {setProducts(await data.message)});  

    return wordCloud; 
  }; 

  window.addEventListener('load', () => {
    fetchData();
  })