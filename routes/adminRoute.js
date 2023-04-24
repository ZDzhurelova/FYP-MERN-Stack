const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const Contractor = require("../models/contractorModel");
const authorization = require("../middleware/authorization");

router.get("/get-all-contractors", authorization , async (req, res) => {
  try {
    const contractors = await Contractor.find({});
    res.status(200).send({
      message: "Contractors fetched successfully",
      success: true,
      data: contractors,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error applying contractor account",
      success: false,
      error,
    });
  }
});

router.get("/get-all-users", authorization, async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).send({
      message: "Users fetched successfully",
      success: true,
      data: users,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error applying contractor account",
      success: false,
      error,
    });
  }
});

router.post(
  "/change-contractor-account-status",
  authorization,
  async (req, res) => {
    try {
      const { contractorId, status } = req.body;
      const contractor = await Contractor.findByIdAndUpdate(contractorId, {
        status,
      });

      const user = await User.findOne({ _id: contractor.userId });
      const unseenNotifications = user.unseenNotifications;
      unseenNotifications.push({
        type: "new-contractor-request-changed",
        message: `Your contractor account has been ${status}`,
        onClickPath: "/notifications",
      });
      user.isContractor = status === "approved" ? true : false;
      await user.save();

      res.status(200).send({
        message: "Contractor status updated successfully",
        success: true,
        data: contractor,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        message: "Error applying contractor account",
        success: false,
        error,
      });
    }
  }
);



module.exports = router;
