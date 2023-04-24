const express = require("express");
const router = express.Router();
const Contractor = require("../models/contractorModel");
const authorization = require("../middleware/authorization");
const Appointment = require("../models/appointmentModel");
const User = require("../models/userModel");

router.post("/get-contractor-info-by-user-id", authorization, async (req, res) => {
  try {
    const contractor = await Contractor.findOne({ userId: req.body.userId });
    res.status(200).send({
      success: true,
      message: "Info fetched successfully",
      data: contractor,
    });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error getting info", success: false, error });
  }
});

router.post("/get-contractor-info-by-id", authorization, async (req, res) => {
  try {
    const contractor = await Contractor.findOne({ _id: req.body.contractorId });
    res.status(200).send({
      success: true,
      message: "Info fetched successfully",
      data: contractor,
    });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error getting info", success: false, error });
  }
});

router.post("/update-contractor-profile", authorization, async (req, res) => {
  try {
    const contractor = await Contractor.findOneAndUpdate(
      { userId: req.body.userId },
      req.body
    );
    res.status(200).send({
      success: true,
      message: "Contractor profile updated successfully",
      data: contractor,
    });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error getting info", success: false, error });
  }
});

router.get(
  "/get-appointments-by-contractor-id",
  authorization,
  async (req, res) => {
    try {
      const contractor = await Contractor.findOne({ userId: req.body.userId });
      const appointments = await Appointment.find({ contractorId: contractor._id });
      res.status(200).send({
        message: "Appointments fetched successfully",
        success: true,
        data: appointments,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        message: "Error fetching appointments",
        success: false,
        error,
      });
    }
  }
);

router.post("/change-appointment-status", authorization, async (req, res) => {
  try {
    const { appointmentId, status } = req.body;
    const appointment = await Appointment.findByIdAndUpdate(appointmentId, {
      status,
    });

    const user = await User.findOne({ _id: appointment.userId });
    const unseenNotifications = user.unseenNotifications;
    unseenNotifications.push({
      type: "appointment-status-changed",
      message: `Your appointment status has been ${status}`,
      onClickPath: "/appointments",
    });

    await user.save();

    res.status(200).send({
      message: "Appointment status updated successfully",
      success: true
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error changing appointment status",
      success: false,
      error,
    });
  }
});

module.exports = router;
