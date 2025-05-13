import express from 'express';

import PetRouter from '../routes/pet.router'

const router = (app: express.Router)=>{
    app.use('/pets', PetRouter);
};

export default router;