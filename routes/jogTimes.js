const express = require('express');
const router = express.Router();
const JogTime = require('../models/jogTime');

//Create/record a jog time
router.post('/', async (request, response) => {
    const newJogTime ={
        name: request.body.name,
        time: request.body.time,
        distance: request.body.distance,
        location: request.body.location,
    }
    try {
        const jogTime = await JogTime.create(newJogTime);
        response.status(201).json(jogTime);
    }catch(error){
        response.status(400).json({ message: error.message });
    }
})

//Get all jog times
router.get('/', async (request, response) => {
    try{
        const jogTimes = await JogTime.find();
        response.json(jogTimes);
    }catch (error){
        response.status(500).json({ message: error})
    }
})

//Get one jog time
router.get('/:id', getJogTime, (request, response) => {
    response.send(response.jogTime.time.toString());
})

//Update a jog time
router.patch('/:id', getJogTime, async (request, response) => {
    const { id } = request.params;
    if(request.body.name != null ){
        response.jogTime.name = request.body.name;
    }
    if(request.body.time != null ){
        response.jogTime.name = request.body.time;
    }
    if(request.body.location != null ){
        response.jogTime.location = request.body.location;
    }
    if(request.body.distance != null ){
        response.jogTime.distance = request.body.distance;
    }

    try{
        const updatedJogTime = await response.jogTime.update();
        response.json(updatedJogTime)
    }catch(error){
        response.status(400).json({ message: error.message })
    }
})

//Delete a jog time
router.delete('/:id', getJogTime, async (request, response) => {
    try{
        await response.jogTime.deleteOne();
        response.json({ message:'Jog Entry Deleted.'})
    }catch (error){
     response.status(500).json({message: error.message});
    }
})

//Middleware to getJogTime
async function getJogTime(request, response, next){
    let jogTime;
    try{
        jogTime = await JogTime.findById(request.params.id);
        if (jogTime == null){
            return response.status(404).json({ message: 'Jog Entry Not Found'});
        }
    }catch(error){
        return response.status(500).json({ message:error.message });
    }

    response.jogTime = jogTime;
    next();
}

module.exports = router;
