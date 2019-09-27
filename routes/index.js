const express = require('express');
const router = express.Router();
const Url = require('../models/Url');

router.get('/:code', async (req, res) => {
  try{
    const code = req.params.code;
    const url = await Url.findOne({ urlCode: code});
    if(url){
      return res.redirect(url.longUrl);
    }else{
      return res.send(404).json('No url found');
    }
  }catch(e){
    console.log(e.message);
    res.send(500).json('Server error');
  }
});

module.exports = router;