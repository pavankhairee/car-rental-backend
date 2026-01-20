import "dotenv/config"
import { Client } from "pg"

const pgClinet = new Client({
    connectionString: `${process.env.DBCONNECTION}`
})

async function connects() {
    try {
        await pgClinet.connect()
    } catch (err) {
        console.log("Connection failed!!", err)
    }
}

export { pgClinet, connects }