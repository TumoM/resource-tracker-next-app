const axios = require('axios');
  

const resources = async (req, res) => {
  if (req.method === 'GET') {
    console.log("Method === Get");
    const resData = await fetch(`${process.env.API_URL}/resources`)

    try{
        const data = await resData.json()
        res.send(data)
      }
      catch(err){
        console.error(err)
        res.send(err)
      }    
    
  } 
  
  else if (req.method==="POST" || req.method==="PATCH"){
    console.log("Data POSTED1");
    console.log(req.body);
    
    const {id, title, description,link, timeToFinish, priority} = req.body
    let url = `${process.env.API_URL}/resources`;
    
    console.log({ title, description,link, timeToFinish, priority});
    if (!title || !description || !timeToFinish || !priority) {
      debugger
      console.log("Data is missing on form Post API")
      return res.status(422).send("Data is missing on form!")
    }

    if (req.method==="PATCH"){
      url+= `/${id}`
    }

    try {
      const axiosRes = await axios[req.method.toLowerCase()](url, req.body);
      return res.send(axiosRes.data);
    } catch {
      return res.status(422).send("Data cannot be stored!");
    }
  }
} 

export default resources