const router = require("express").Router();

const Complaint =
require("../models/Complaint");


// CREATE COMPLAINT
router.post("/", async (req, res) => {

  try {

    const data =
    await Complaint.create(req.body);

    res.json(data);

  } catch (err) {

    res.status(500).json({
      message: err.message
    });

  }

});


// GET ALL COMPLAINTS
router.get("/", async (req, res) => {

  try {

    const data =
    await Complaint.find();

    res.json(data);

  } catch (err) {

    res.status(500).json({
      message: err.message
    });

  }

});
router.put("/:id", async (req, res) => {

  try {

    const updatedComplaint =
      await Complaint.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );

    res.json(updatedComplaint);

  } catch (err) {

    res.status(500).json({
      message: err.message,
    });

  }

});

router.get(

"/resident/:residentId",

async(req,res)=>{

 try {

  const complaints =

  await Complaint.find({

   residentId:
   req.params.residentId

  });

  res.json(complaints);

 }

 catch(err){

  res.status(500).json(err);

 }

});

module.exports = router;