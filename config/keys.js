module.exports = {
  mongoURI: 'mongodb://jesin:jesinki2maza@cluster0-shard-00-00.gsms9.mongodb.net:27017,cluster0-shard-00-01.gsms9.mongodb.net:27017,cluster0-shard-00-02.gsms9.mongodb.net:27017/Vote?ssl=true&replicaSet=atlas-f2r75u-shard-0&authSource=admin&retryWrites=true&w=majority',
  pusherAppId: '1232531',
  pusherKey: '7d90cde296e0f41003bb',
  pusherSecret: 'e994ca09b2f66a840220',
  pusherCluster: 'eu',
  pusherEncrypted: true
};

// const { MongoClient } = require('mongodb');
// const uri = "mongodb+srv://jesin:jesinki2maza@cluster0.gsms9.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });
