const mongoose = require('mongoose');
const mongoURL = 'mongodb://gofood:Khushal123@ac-wttcorb-shard-00-00.q3luibq.mongodb.net:27017,ac-wttcorb-shard-00-01.q3luibq.mongodb.net:27017,ac-wttcorb-shard-00-02.q3luibq.mongodb.net:27017/gofoodmern?ssl=true&replicaSet=atlas-2u9p2q-shard-0&authSource=admin&retryWrites=true&w=majority';

const mongoDB = async () => {
    try {
      await mongoose.connect(mongoURL, { useNewUrlParser: true ,useUnifiedTopology: true });
      console.log('Connected successfully');
  
      const foodItemsCollection = mongoose.connection.db.collection('food_items');
      const data = await foodItemsCollection.find({}).toArray();
      global.food_items = data

      const foodCategoryCollection= mongoose.connection.db.collection('foodCategory');
      const dataCategory =await foodCategoryCollection.find({}).toArray()
      global.foodCategory = dataCategory


      // console.log(global.food_items)
      // console.log(global.foodCategory)
      
      
      // making global variable for data collected
    } catch (err) {
      console.error('Error connecting to MongoDB:', err.message);
    } 
  };
  
  module.exports = mongoDB;