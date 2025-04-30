import connectToDataBase from "./database/data.js";

//ESTABELECENDO CONEXÃO COM O BANCO DE DADOS DE FORMA SEGURA
async function main() {
    await connectToDataBase(process.env.USERDATABASE, process.env.PASSWORDDATABASE);
        
}

main();