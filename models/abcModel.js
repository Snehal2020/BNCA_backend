const mongoose =require("mongoose");

const abcSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    }
}
);

module.exports = mongoose.model("abc", abcSchema);