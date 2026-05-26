const router = require("express").Router();

const Notice =
  require("../models/Notice");


// CREATE NOTICE

router.post("/", async(req, res) => {

  try {

    const notice =
      await Notice.create(req.body);

    res.json(notice);

  } catch(err) {

    res.status(500).json(err);

  }

});


// GET ALL NOTICES

router.get("/", async(req, res) => {

  try {

    const notices =
      await Notice.find().sort({
        createdAt: -1
      });

    res.json(notices);

  } catch(err) {

    res.status(500).json(err);

  }

});


// DELETE NOTICE

router.delete("/:id", async(req, res) => {

  try {

    await Notice.findByIdAndDelete(
      req.params.id
    );

    res.json({
      message:
        "Notice deleted"
    });

  } catch(err) {

    res.status(500).json(err);

  }

});

module.exports = router;