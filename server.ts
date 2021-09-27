import { app } from "./app"
require('dotenv').config()
const port = process.env.PORT ? process.env.PORT : 4500;
app.listen(port, () => {
    console.log("🚀 Server Running");
    console.log("🚀 Port", port);
});