const File = require("../models/file.model");
const response = require("../utils/response");
const CustomError = require("../utils/CustomError");

/**
 * Controllers for :
 *
 * getFiles
 * getFile,
 * createFile,
 * updateFile,
 * deleteFile
 */

class FileContoller {
  // Add file
  async createFile(req,res){
    if (req.file) req.body["fileURL"] = req.file.path

    let file = new File(req.body)
    file.save()

    res.status(201).json(response("File created", file, true))
  }

  // Get one file
  async getFile(req, res) {
    await File.findOne({ _id: req.params.fileId }, (err, file) => {
      if (err) throw new CustomError("Error occured while retriving files");

      if (!file) return res.status(404).json(response("File Not Found", null, false))

      res.status(200).json(response("File Found", file, true))
    })
  }

  //route handler to get all files
  async getFiles(req, res) {
    let files = await File.find({});

    if (!files) return res.status(200).json(response("No Files Found", files, true))

    return res.status(200).json(response("All Files Found", files, true))
  }

  // Delete one file
  deleteFile(req, res) {
    File.deleteOne({ _id: req.params.id }).then(() => {
      res.status(200).json({
        status: true,
        message: "File Deleted",
      });
    });
  }
}

module.exports = new FileContoller();
