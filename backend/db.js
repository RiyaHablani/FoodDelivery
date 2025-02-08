const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const mongoURI =  "mongodb+srv://riyahablani17:riyahablani17@cluster0.0td1d.mongodb.net/gofoodmern?retryWrites=true&w=majority&appName=Cluster0";
;

const mongoDB = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected successfully");

    // Fetch data from 'food_item' and 'foodCategory' collections
    const foodItemsCollection = mongoose.connection.db.collection("food_item");
    const foodCategoryCollection =
      mongoose.connection.db.collection("foodCategory");

    const foodItemsData = await foodItemsCollection.find({}).toArray();
    const foodCategoryData = await foodCategoryCollection.find({}).toArray();

    // Store data in global variables
    global.food_item = foodItemsData;
    global.foodCategory = foodCategoryData;

    console.log("Data fetched and stored in global variables");
  } catch (err) {
    console.error("Error connecting to MongoDB or fetching data:", err);
  }
};

module.exports = mongoDB;
