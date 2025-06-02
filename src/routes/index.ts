import express from "express";

import PetRouter from "../routes/pet.routes";
import AdopterRoutes from "../routes/adopter.routes";

const router = (app: express.Router) => {
    app.use("/pets", PetRouter);
    app.use("/adopter", AdopterRoutes);
};

export default router;