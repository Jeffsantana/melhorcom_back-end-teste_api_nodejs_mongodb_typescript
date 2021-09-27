import { app } from "./app"
require('dotenv').config()

app.listen(process.env.PORT, () => {
    console.log("🚀 Server Running");
    console.log("🚀 Port", process.env.PORT);
});