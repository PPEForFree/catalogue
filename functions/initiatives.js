import {MongoClient} from 'mongodb';


const getDocuments = async function() {
  const client = new MongoClient(process.env.MONGO_DB_URL);

  try {
    await client.connect();
    const data = client
      .db("initiatives")
      .collection("documents")
      .find({})
      .toArray();
    return data;
  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
  }
}


exports.handler = async function(event, context, callback) {
  try {
    const data = await getDocuments();
    return {
      statusCode: 200,
      body: JSON.stringify(data)
    };
  } catch (err) {
    console.error(err); // output to netlify function log
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: err.message })
    };
  }
}
