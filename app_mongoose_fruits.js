const mongoose = require('mongoose');

//create or connect to fruitsDB
mongoose.connect("mongodb://localhost:27017/fruitsDB", {
  useNewUrlParser: true, useUnifiedTopology: true });


//Schema examples, format for databse object
//Demo of built-in validators
const fruitSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "What is this strange fruit?"]
  },
  rating: {
    type:Number,
    min: 1,     //mongoose validation
    max: 10     //mongoose validation
  },
  review: String
});

//Define fruit object
const Fruit = mongoose.model("Fruit", fruitSchema);

const apple = new Fruit({
  name: "Apple",
  rating: 8,
  review: "Great fruit if not too ripe"
});
//apple.save();


//Fruit with rating outside of limits is barred from database
const tomato = new Fruit({
  name: "Tomato",
  rating: -10,
  review: "Not a fruit?!?!?"
});
//tomato.save();


//Name field is required, pear NOT added to db
const pear = new Fruit({
  rating: 7,
  review: "Deece"
});
//pear.save();


const peach = new Fruit({
  name: "Peach",
  review: "Yummzah"
});
//peach.save();

const kiwi = new Fruit({
  name:"Kiwi",
  rating: 10,
  review: "Great fruit yum"
});

const plum = new Fruit({
  name:"Plum",
  rating: 8,
  review: "Pretty good, easy to go bad, but then great in crumble."
});

const pineapple = new Fruit({
  name:"Pinapple",
  rating: 6,
  review: "Great, but gets stuck in teeth."
});

// Fruit.insertMany([apple, kiwi, plum], function(err){
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("Successfully saved fruits");
//   }
// })

//
// Fruit.find(function(err, fruits){
//   if (err) {
//     console.log(err);
//   } else {
//     mongoose.connection.close();
//
//     fruits.forEach(function(fruit){
//       console.log(fruit.name);
//     });
//   }
// });

//
// //Update a database element
// Fruit.updateOne({_id: "5ff5cd89eba31d423842706f"}, {rating: 7}, function(err){
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("Successfuly updated document");
//   }
// });

// Fruit.deleteOne({_id:"5ff5cd5694c8cf1ef0faadc9"}, function(err){
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("Successfuly deleted document");
//   }
// });
//
// //Delete many elements, using gt IDs. Ie, IDs increase in value (?)
// Fruit.deleteMany({ name: "Apple", _id: {$gt: "5ff5c190dd98bc36f48eb1f5"}}, function(err){
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("Successfuly deleted documents");
//   }
// });
//
// Fruit.deleteMany({ name: "Peach", _id: {$gt: "5ff5cd89eba31d423842706f"}}, function(err){
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("Successfuly deleted documents");
//   }
// });





//Relational Databses

const personSchema = new mongoose.Schema({
  name: String,
  age: Number,
  occupation: String,
  favouriteFruit: fruitSchema
});

//Define person object
const Person = mongoose.model("Person", personSchema);

const john = new Person({
  name: "John",
  age: 39,
  occupation: "Orchitis specialist"
});
//john.save();


const amy = new Person({
  name: "Amy",
  age: 8,
  occupation: "Muppet",
  favouriteFruit: pineapple
});

//amy.save();

//
// Person.deleteMany({ name: "John", _id: {$gt: "5ff5d637b3877b4140e29276"}}, function(err){
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("Successfuly deleted Johns...");
//   }
// });

Person.updateOne({name: "John"}, {favouriteFruit: peach}, function(err){
  if (err) {
    console.log(err);
  } else {
    console.log("Successfuly updated John's fruit");
  }
});



//remember to start server using mongod
