import express from "express";
import classRouter from "./Routes/classRoutes";
import cors from "cors";
import ClassController from "./Controllers/classController";
const app = express();

/**
 * TODO:
 *  - add routes for majors
 */

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/**
 * Classes handlers
 */
app.use('/classes', classRouter);

/**
 * Majors handlers
 */
app.use('/majors', (req, res) => {
    res.status(200).json({message: "Majors"});
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
}
);