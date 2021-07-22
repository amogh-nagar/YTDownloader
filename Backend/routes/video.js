const express=require('express')
const router=express.Router()
const videocontroller=require('../controllers/video')


router.get('/',videocontroller.downloadvideo)

router.get('/detail',videocontroller.videodetails)



module.exports=router;