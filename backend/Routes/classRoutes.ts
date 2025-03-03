import express from "express";
import ClassController from "../Controllers/classController";
const router = express.Router();
const cc = new ClassController();

router.post("/create", async (req, res) => {
    const code = await cc.createClass(req);
    if(code == 200){
        res.status(200).json({message: "Class Created"});
    } else {
        res.status(400).json({message: "Class Not Created"});
    }
}); 
router.get("/:class", async (req, res) => {
    try{
        const result = await cc.searchClasses(req);
        if(!result){
            res.status(404).send("Class Not Found");
            return;
        }
        
        res.status(200).json(result);
    } catch(e){
        console.log(e);
    }
});



export default router;