const fs = require('fs'); //fs = file sistem
const http = require('http'); 
const url = require('url'); 

//***************** FILES *******************// 


//blocking, synchronomus way

//const textIn = fs.readFileSync('./txt/input.txt', 'utf-8');
//console.log(textIn);

//const textOut = `This is what we know about the avocado: ${textIn}.\nCreated on ${Date.now()}`;
//fs.writeFileSync('./txt/output.txt', textOut);
//console.log('File written!');

//Non-blocking, asynchronomus way

//fs.readFile('./txt/start.txt', 'utf-8', (err, data1) => {
    //if(err) return console.log("ERROR ❌")
    //fs.readFile(`./txt/${data1}.txt`, 'utf-8', (err, data2) => {
        //console.log(data2);
        //fs.readFile('./txt/append.txt', 'utf-8', (err, data3) => {
            //console.log(data3);
            
            //fs.writeFile('./txt/final.txt', `${data2}\n${data3}`, 'utf-8', err => {
                //console.log("Your file has been written!!☺️");
            //});
        //});
    //});   
//});

//console.log('This one gotta be first!');

//***************** SERVER *******************// 
const replaceTemplate = (temp, product) => {
    let output = temp.replace(/{%PRODUCTNAME%}/g, product.productName);
    output = output.replace(/{%IMAGE%}/g, product.image);
    output = output.replace(/{%PRICE%}/g, product.price);
    output = output.replace(/{%FROM%}/g, product.from);
    output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
    output = output.replace(/{%QUANTITY%}/g, product.quantity);
    output = output.replace(/{%DESCRIPTION%}/g, product.description);
    output = output.replace(/{%ID%}/g, product.id);

    if(!product.organic) output = output.replace(/{%NOT_ORGANIC%}/g, 'not-organic');
    return output;
}

const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, 'utf-8');
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf-8');
const tempProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, 'utf-8');

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);
            

const server = http.createServer((req, res) => {
    //console.log(req.url);
    //res.end('Page connected');

    const pathName = req.url;

    //OVERVIEW PAGE
    if (pathName === '/' || pathName === '/overview'){
        res.writeHead(200, { 'Content-type': 'text/html'});

        const cardsHtml = dataObj.map(el => replaceTemplate(tempCard, el));
        console.log(cardsHtml);

        res.end(tempOverview);

    //PPRODUCT PAGE
    } else if (pathName === '/product') {
        res.end('This is a PRODUCT PAGE!');
    
    //API
    } else if (pathName === '/api') {
        /*fs.readFile(`${__dirname}/dev-data/data.json`, 'utf-8', (err, data) => {
            const productData = JSON.parse(data);
            res.writeHead(200, { 'Content-type': 'application/json'});
            res.end(data);
        });*/
        res.writeHead(200, { 'Content-type': 'appoutput = lication/json'});
        res.end(data);

    //NOT FOUND
    } else {
        res.writeHead(404, {
           'Content-type': 'txt/html',
           'my-own-header': 'hello world'
        });
        res.end('<h1>Page not found!</h1>');
    }
});

server.listen(8000, '127.0.0.1', () => {
    console.log('Listening to requests on port 8000');
})

/* API é um serviço do qual podemos solicitar alguns dados
JSON é um formato de texto simples que se parece muito com o objeto JAVASCRIPT, 
pode ter array's, esses dados (valores dentro array's) são o que a nossa API 
enviará para o cliente  quando solicitado */

