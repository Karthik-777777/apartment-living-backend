const express = require("express");

const router = express.Router();

const Payment =
require("../models/Payment");


// GET ALL PAYMENTS

router.get("/", async(req, res) => {

  try {

    const payments =
    await Payment.find();

    res.json(payments);

  } catch(err) {

    res.status(500).json(err);

  }

});


// CREATE PAYMENT

router.post("/", async(req, res) => {

  try {

    const payment =
    new Payment({

      residentName:
      req.body.residentName,

      residentId:
      req.body.residentId,

      flatNumber:
      req.body.flatNumber,

      
      month:
      req.body.month,

      paymentType:
      req.body.paymentType,

      status:
      req.body.status || "Pending",

      transactionId:
      req.body.transactionId || "",

      paymentProof:
      req.body.paymentProof || "",

      upiId:
      req.body.upiId || "",

      qrCode:
      req.body.qrCode || "",

      bankName:
      req.body.bankName || "",

      accountNumber:
      req.body.accountNumber || "",

      ifscCode:
      req.body.ifscCode || "",

      paymentApp:
      req.body.paymentApp || "",

      maintenance:
req.body.maintenance || 0,

waterBill:
req.body.waterBill || 0,

electricityBill:
req.body.electricityBill || 0,

rent:
req.body.rent || 0,

parkingFee:
req.body.parkingFee || 0,

penalty:
req.body.penalty || 0,

otherCharges:
req.body.otherCharges || 0,

totalAmount:
req.body.totalAmount,



    });
    console.log(payment);

    const savedPayment =
    await payment.save();

    res.status(201)
    .json(savedPayment);

  }

  catch(err) {
    console.log(err);
    res.status(500)
    .json({

      error:
      err.message

    });

  }

});


// UPDATE PAYMENT

router.put("/:id", async(req, res) => {

  try {

    const updated =
    await Payment.findByIdAndUpdate(

      req.params.id,

      req.body,

      { new: true }

    );

    res.json(updated);

  } catch(err) {

    res.status(500).json(err);

  }

});


// DELETE PAYMENT

router.delete("/:id", async(req, res) => {

  try {

    await Payment.findByIdAndDelete(
      req.params.id
    );

    res.json({
      message:
      "Payment deleted"
    });

  } catch(err) {

    res.status(500).json(err);

  }

});

// GET PAYMENTS BY RESIDENT ID

router.get(
  "/resident/:residentId",

  async (req, res) => {

    try {

      const payments =

      await Payment.find({

        residentId:
        req.params.residentId

      })

      .sort({

        createdAt: -1

      });

      res.json(payments);

    }

    catch(err) {

      res.status(500)
      .json({

        error:
        err.message

      });

    }

  }
);


// AUTO GENERATE MONTHLY BILLS

router.post(

  "/generate-bills",

  async (req, res) => {

    try {

      const Resident =
      require("../models/Resident");

      const {

        month

      } = req.body;


      // GET APPROVED RESIDENTS

      const residents =

      await Resident.find({

        status: "Approved"

      });


      let createdBills = [];


      for(const resident of residents) {


        // CHECK EXISTING BILL

        const existingBill =

await Payment.findOne({

  residentId:
  resident.residentId,

  month

});


        // SKIP DUPLICATES

        if(existingBill) {

          continue;

        }


        // CREATE PAYMENT BILL

        const payment =

        new Payment({

          

          residentName:
          resident.residentName,

          residentId:
          resident.residentId,

          flatNumber:
          resident.flatNumber,

         totalAmount:

Number(req.body.maintenance || 0)

+

Number(req.body.waterBill || 0)

+

Number(req.body.electricityBill || 0)

+

Number(req.body.rent || 0)

+

Number(req.body.parkingFee || 0)

+

Number(req.body.penalty || 0)

+

Number(req.body.otherCharges || 0),

          month,

          paymentType:
"Monthly Rent",

          status:
          "Pending",

          maintenance:
req.body.maintenance || 0,

waterBill:
req.body.waterBill || 0,

electricityBill:
req.body.electricityBill || 0,

rent:
req.body.rent || 0,

parkingFee:
req.body.parkingFee || 0,

penalty:
req.body.penalty || 0,

otherCharges:
req.body.otherCharges || 0,




          // PAYMENT DETAILS

          upiId:
          "apartmentliving@upi",

          qrCode:
          "/qr.png",

          bankName:
          "State Bank of India",

          accountNumber:
          "1234567890",

          ifscCode:
          "SBIN0001234",

          paymentApp:
          "PhonePe / GPay / Paytm"

        });


        await payment.save();

        createdBills.push(payment);

      }


      res.json({

        message:
        "Bills generated successfully",

        totalBills:
        createdBills.length,

        bills:
        createdBills

      });

    }

    catch(err) {

      res.status(500)
      .json({

        error:
        err.message

      });

    }

  }


  
);


module.exports = router;