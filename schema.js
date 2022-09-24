const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const imageSchema = new Schema ({
  imageUpload: {type: String}
});

const ImageUpload = mongoose.model("images", imageSchema);

module.exports = {ImageUpload};
