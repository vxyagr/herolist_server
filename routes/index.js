// import express
import express from "express";
import fs from "fs";
import path from "path";
import multer from 'multer';
  
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
});

var upload = multer({ storage: storage });
// import controllers
import { getHeroes, 
    getHeroById, 
    getHeroByAgency,
    getHeroByPower,
    saveHero, 
    updateHero,
    deleteHero } from "../controllers/heroController.js";
 
    // express router
const router = express.Router();
 
// Route get All Heroes
router.get('/', getHeroes);
// Route get single Hero
router.get('/:id', getHeroById);
// Route get Hero by Agency
router.get('/agency/:agency', getHeroByAgency);
// Route get Hero by Power
router.get('/power/:power', getHeroByPower);
// Route CREATE Hero
router.post('/',upload.single('image'), saveHero);
// Route UPDATE Hero
router.post('/update/:id', updateHero);
// Route DELETE Hero
router.post('/delete/:id', deleteHero);
 

// export router
export default router;