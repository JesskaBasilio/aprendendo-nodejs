async function connectToDataBase(user, password) {

    if(user=== process.env.USERDATABASE && password=== process.env.PASSWORDDATABASE){
        console.log("conexão com banco de dados estabelecida");
    }else{
        console.log("Falha de login, não foi possível conectar com o banco de dados");
    }
}

export default connectToDataBase;
    
