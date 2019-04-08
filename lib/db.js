// setup the db
import low from "lowdb";
import FileSync from "lowdb/adapters/FileSync";

const adapter = new FileSync("db.json");

const db = low(adapter);

// Set some defaults
db.defaults({ countObject: [] }).write();

export default db;
