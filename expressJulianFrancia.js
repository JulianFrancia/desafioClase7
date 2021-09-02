import expres from 'express';
import fs from 'fs';

const app = expres();
const PORT = 8080;
const rutaArchivo = './productos.txt';
let visitaItems = 0;
let visitaItemRandom = 0;

const server = app.listen(PORT, () => {
    console.log(`escuchando en ${server.address().port}`);
})

app.get('/items', (req,res) => {
    visitaItems++;
    fs.promises.readFile(rutaArchivo,'utf-8').then(response => {
        res.json({items: JSON.parse(response), cantidad:JSON.parse(response).length})
    }).catch( error => {
        console.log(error)
    })
})

app.get('/item-random', (req,res) => {
    visitaItemRandom++;
    fs.promises.readFile(rutaArchivo,'utf-8').then(response => {
        let random = Math.floor(Math.random() * JSON.parse(response).length )
        res.json({item: JSON.parse(response)[random]})
    }).catch(error => {
        console.log(error)
    })
})

app.get('/visitas', (req,res) => {
    res.json({visitas:{items:visitaItems, item: visitaItemRandom}});
})