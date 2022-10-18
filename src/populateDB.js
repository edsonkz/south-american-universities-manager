import { api } from "./service/api";
import { url, mongo, connectionParams } from "./database/db";
import { University } from "./models/university";

mongo
    .connect(url, connectionParams)
    .then(async () => {
        console.log("Connected to database ");
        await main();
        mongo.connection.close();
    })
    .catch((err) => {
        console.error(`Error connecting to the database. \n${err}`);
    });

async function create(universities) {
    let newUniversity = new University(universities);
    newUniversity.save(universities);
}

async function main() {
    try {
        let countries = ["brazil, argentina, chile, colombia, paraguay, peru, suriname, uruguay"];
        let response;

        for (let country of countries){
        response = (await api.get("search", { params: { country} })).data;

        console.log(response);
        await create(response);
        }

    } catch (error) {
        console.log(error.message);
        return true;
    }
}