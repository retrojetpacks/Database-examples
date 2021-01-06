//Require mongo package. Assert is for testing.
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

//Connection URL. Mongodb wants the port 27017
const url = 'mongodb://localhost:27017';

//DB name
const dbName = 'fruitsDB';

//Create new mongo MongoClient
const client = new MongoClient(url, { useUnifiedTopology: true });

//Use connect method to connect to server
client.connect(function(err) {
  assert.equal(null,err);
  console.log("Connected successfully to server");

  const db = client.db(dbName);

  //Insert docs, then close db
  // insertDocuments(db, function() {
  //   client.close();
  // });
  //Find docs, then close db
  findDocuments(db, function() {
    client.close();
  });
});

//Create a new collection
const insertDocuments = function(db, callback) {
  //Get the documents collection
  const collection = db.collection('fruits');

  //Insert some insertDocuments
  collection.insertMany(
    [
      {
        name: "Apple",
        score: 8,
        review: "Great fruit if not too ripe"
      },
      {
        name: "Orange",
        score: 7,
        review: "Tough to access, great in juice"
      },
      {
        name: "Banana",
        score:7,
        review: "Good when good, icky when icky"
      }
    ], function(err, result) {
      //Error validation
      assert.equal(err, null);
      assert.equal(3, result.result.n);
      assert.equal(3, result.ops.length);
      console.log("Inserted 3 docs into the collection");
    }
  )
}

//Find Documents
const findDocuments = function(db, callback){
  //Get the documents collection
  const collection = db.collection('fruits');

  //Find some Documents
  collection.find({}).toArray(function(err, fruits){
    assert.equal(err, null);
    console.log("Found the following records");
    console.log(fruits);
    callback(fruits);
  });
};




//remember to start server using mongod
