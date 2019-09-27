const express = require('express');
const router = express.Router();
const validUrl = require('valid-url');
const shortid = require('shortid');
//const config = require('config');

const Url = require('../models/Url');

router.post('/shorten', async (req, res) => {
  const { longUrl } = req.body;
  const baseUrl = '"http://localhost:5000"';//config.get('baseUrl');
  
  console.log('longUrl ',longUrl);

  if(!validUrl.isUri(baseUrl)){
    res.sendStatus(401);
  }
  const urlCode = shortid.generate();
  console.log('urlCode ',urlCode);

  if(validUrl.isUri(longUrl)){
    try{
      let url = await Url.findOne({ longUrl });
      if(url){
        res.json(url);
      }else{
        const shortUrl = `${baseUrl}/${urlCode}`;
        url = new Url({
          longUrl,
          shortUrl,
          urlCode,
          date: new Date()
        });
        await url.save();
        res.json(url);
      }
    }catch(e){
      console.log(e.message);
      res.send(500);
    }
  }else{
    res.send(401);
  }

});

module.exports = router;