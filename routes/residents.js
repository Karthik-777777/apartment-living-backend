const express =
require("express");

const router =
express.Router();

const Resident =
require("../models/Resident");


// CREATE RESIDENT

router.post(
  "/",
  async (req, res) => {

    try {

      // CHECK DUPLICATE FLAT

      const existingResident =
      await Resident.findOne({

        flatNumber:
        req.body.flatNumber,

      });

      if(existingResident) {

        return res.status(400)
        .json({

          message:
          "Flat already registered",

        });

      }

      // CREATE RESIDENT

      const resident =
      new Resident(req.body);

      await resident.save();

      res.status(201)
      .json(resident);

    } catch(err) {

      res.status(500)
      .json({

        error:
        err.message,

      });

    }

  }
);


// GET ALL RESIDENTS

router.get(
  "/",
  async (req, res) => {

    try {

      const residents =
      await Resident.find();

      res.json(residents);

    } catch(err) {

      res.status(500)
      .json({

        error:
        err.message,

      });

    }

  }
);


// GET SINGLE RESIDENT

router.get(
  "/:id",
  async (req, res) => {

    try {

      const resident =

      await Resident.findOne({

        $or: [

          {
            _id:
            req.params.id
          },

          {
            residentId:
            req.params.id
          }

        ]

      });

      if(!resident) {

        return res.status(404)
        .json({

          message:
          "Resident not found",

        });

      }

      res.json(resident);

    } catch(err) {

      // TRY RESIDENT ID SEARCH

      try {

        const resident =

        await Resident.findOne({

          residentId:
          req.params.id

        });

        if(!resident) {

          return res.status(404)
          .json({

            message:
            "Resident not found",

          });

        }

        res.json(resident);

      } catch(error) {

        res.status(500)
        .json({

          error:
          error.message,

        });

      }

    }

  }
);

// UPDATE RESIDENT

router.put(
  "/:id",
  async (req, res) => {

    try {

      const resident =
      await Resident.findById(
        req.params.id
      );

      if(!resident) {

        return res.status(404)
        .json({

          message:
          "Resident not found",

        });

      }

      // IF APPROVED

      if(req.body.status === "Approved") {

        // GENERATE YEAR

        const year =
        new Date()
        .getFullYear()
        .toString()
        .slice(-2);

        // GENERATE RESIDENT ID

        const residentId =

        `${year}-RESID-${resident.block}-${resident.flatNumber}`;

        resident.residentId =
        residentId;

      }

      // UPDATE STATUS

      resident.status =
      req.body.status;

      await resident.save();

      res.json(resident);

    } catch(err) {

      res.status(500)
      .json({

        error:
        err.message,

      });

    }

  }
);

// DELETE RESIDENT

router.delete(
  "/:id",
  async (req, res) => {

    try {

      await Resident.findByIdAndDelete(
        req.params.id
      );

      res.json({
        message:
        "Resident deleted",
      });

    } catch(err) {

      res.status(500)
      .json({

        error:
        err.message,

      });

    }

  }
);

router.get("/:id", async(req, res) => {

  try {

    const resident =

    await Resident.findById(
      req.params.id
    );

    res.json(resident);

  }

  catch(err) {

    res.status(500).json(err);

  }

});

module.exports = router;