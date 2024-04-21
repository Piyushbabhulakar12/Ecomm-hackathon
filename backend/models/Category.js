const mongoose = require("mongoose");

const autoIncrementPlugin = (schema, options) => {
  schema.add({
    id: { type: Number, unique: true },
  });

  schema.pre("save", async function (next) {
    if (!this.id) {
      const maxId = await this.constructor
        .find()
        .sort("-id")
        .limit(1)
        .select("id");
      this.id = maxId && maxId.length > 0 ? maxId[0].id + 1 : 1;
    }
    next();
  });
};

const categorySchema = new mongoose.Schema({
  id: { type: Number, unique: true },
  category_name: { type: String, required: true },
  description: { type: String },
  status: { type: Boolean, default: true },
});

categorySchema.plugin(autoIncrementPlugin);

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
