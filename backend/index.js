import express from "express";
import cors from "cors";
import router from "./routes/peopleRoutes.js";

const app = express();

app.use(express.json());
app.use(cors());
app.use('/api/', router);
export default app;
app.listen(5000, ()=> {
    console.log('Running on port', 5000);
});