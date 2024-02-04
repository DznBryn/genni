import mongoose from "mongoose";

// export default function (uri, clientOptions){
//   mongoose.connect(uri, clientOptions);
//   mongoose.connection.once('open', (stream) => {
//     console.log('Connected to MongoDB', stream);
//   });
// }

export default async function(uri, clientOptions, db) {
  try {
    uri+=db
    await mongoose.connect(uri, clientOptions);
    await mongoose.connection.db.admin().command({ ping: 1 });
    console.log('Connected');
    return { success: true };
  } catch (error) {
    console.log(
      'There was an error connecting to MongoDB:',
      err
    );
    await mongoose.disconnect();
    return { error}
  }
}
