const mongoose = require("mongoose");
const dbUrl = "mongodb+srv://missmaria8520_db_user:iPaTSkciPBAAs97X@cluster0.hyfzpcj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
mongoose.connect(dbUrl, {
    autoIndex: true,
    autoCreate: true,
    dbName: "TechHub"
});

const db = mongoose.connection;

db.on("error", (error) => {
    console.error("Error connecting database:", error.message);
});

db.once("open", () => {
    console.log("Database Connected Successfully!");
});