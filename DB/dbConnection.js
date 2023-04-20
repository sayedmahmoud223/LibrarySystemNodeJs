import mongoose from "mongoose"

export let dbConnection = async () => {
    await mongoose.connect(process.env.CONNECTION)
        .then(() => console.log("db is connected ..........."))
        .catch((error) => console.log(`error db isn't connected ...........${error}`))
}