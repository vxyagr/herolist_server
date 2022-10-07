// import models
import Hero from "../models/Hero.js";
import fs from "fs";
import path from "path";
import crypto from "crypto";
const __dirname = path.resolve();  
import * as dotenv from 'dotenv' 
dotenv.config()

 
// function get All Products
export const getHeroes = async (req, res) => {
    try {
        const heroes = await Hero.find();
        res.json(heroes);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
     
}
 
// function get single Hero
export const getHeroById = async (req, res) => {
    try {
        const hero = await Hero.findById(req.params.id);
        res.json(hero);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
     
}

// function get single Hero
export const getHeroByAgency = async (req, res) => {
    try {
        console.log(req.params.agency);
        const hero = await Hero.find({"agency":req.params.agency});
        res.json(hero);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
     
}

// function get single Hero
export const getHeroByPower = async (req, res) => {
    try {
        console.log(req.params.power);
        const hero = await Hero.find({"power":new RegExp(req.params.power, 'i') });
        res.json(hero);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
     
}
 
// function Create Hero
export const saveHero = async (req, res) => {
 
    req.body.image={
        data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
        contentType: 'image/png'
    };
    const hero = new Hero(req.body);
    try {
        const savedHero = await hero.save();
       // res.status(201).json(savedHero);
        console.log("saved : " + savedHero._id);
        res.redirect(process.env.LIST_PAGE)
        
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}
 
// function Update Hero
export const updateHero = async (req, res) => {
    console.log("Updating Hero " + req.params.id) ;
    if(!req.params.id||req.params.id==undefined){
        console.log("param required");
        res.status(400).json({message: "param required"});
    }else{
            const cekId = await Hero.findById(req.params.id);
            if(!cekId) return res.status(404).json({message: "Hero not found"}); 
            console.log("params " + req.body.id + " " + req.body.agency);
            var enck_1 = process.env.SECRET_KEY + req.params.id + req.body.agency;
             var enck = crypto.createHash("md5").update(JSON.stringify(enck_1)).digest("hex");
            if(enck.toString()!=req.body.enck.toString()){
                res.status(400).json({message:"unauthorized access"});
            }else{
            try {
                //console.log("this " + req.body);
                const updatedHero = await Hero.updateOne({_id: req.params.id}, {$set: req.body});
            
                //res.status(200).json(updatedHero);
                res.redirect(process.env.LIST_PAGE);
            } catch (error) {
                res.status(400).json({message: error.message});
            }
        }
    }
}
 
// function Delete Hero
export const deleteHero = async (req, res) => {
    const cekId = await Hero.findById(req.params.id);
    if(!cekId) return res.status(404).json({message: "Hero not found"});
    var enck_1 = process.env.SECRET_KEY + req.params.id + req.body.agency;
    var enck = crypto.createHash("md5").update(JSON.stringify(enck_1)).digest("hex");
    if(enck.toString()!=req.body.enck.toString()){
            res.status(400).json({message:"unauthorized access"});
    }else{
    try {
        const deletedHero = await Hero.deleteOne({_id: req.params.id});
        //res.status(200).json(deletedHero);
        res.redirect(process.env.LIST_PAGE);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}
}