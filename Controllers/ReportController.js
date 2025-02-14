const Report = require("../Models/report");
const multer = require("multer");
const fs = require("fs");
const seniorGroup = require("../Models/seniorGroup");
const Notification = require("../Models/notificationsModel");

const upload = multer({ storage: multer.memoryStorage() });

// get all reports
const getAllReports = async (req, res) => {
  try {
    const reports = await Report.find();
    res.status(200).json(reports);
  } catch (error) {
    res.status(500).json({ error: "Failed to get reports" });
  }
};

// get all reports
const removeReport = async (req, res) => {
  try {
    const { reportId } = req.params;

    const reports = await Report.findOneAndDelete({ _id: reportId });
    res.status(200).json(reports);
  } catch (error) {
    res.status(500).json({ error: "Failed to remove report" });
  }
};

// create a new report
const createReport = async (req, res) => {
  try {
    const { title, description, group } = req.body;
    const uploadedFilePath = req.file.path;
    const report = new Report({
      title,
      description,
      group,
      file: uploadedFilePath,
    });
    const groupToGetLecId = await seniorGroup.findById(group);
    await Notification.create({
      title: "New Report",
      content: "You have a new report uploaded",
      type: "seniorReport",
      recevier: groupToGetLecId.lecturer,
    });
    await report.save();
    res.status(201).json(report);
  } catch (error) {
    res.status(500).json({ error: "Failed to create report" });
  }
};

// delete a report
const deleteReport = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedReport = await Report.findByIdAndDelete(id);

    // Remove the file
    await Promise.all(
      deletedReport.file.map(async (filePath) => {
        await fs.unlinkSync(filePath);
      })
    );

    if (!deletedReport) {
      return res.status(404).json({ error: "Report not found" });
    }

    res.status(200).json({ message: "Report deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete report" });
  }
};

module.exports = {
  getAllReports,
  createReport,
  deleteReport,
  removeReport,
};
