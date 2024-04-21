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

const productSchema = new mongoose.Schema({
  id: { type: Number, unique: true },
  product_name: { type: String, required: true },
  pack_size: { type: String },
  mrp: { type: Number },
  product_image: { type: String },
  status: { type: Boolean, default: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
});

productSchema.plugin(autoIncrementPlugin);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
