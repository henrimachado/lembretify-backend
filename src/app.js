import { adicionarLembrete, createTable, deletarLembrete, selecionarLembretes } from './controller/lembrete.js'
import express from 'express'
import cors from 'cors'


const app = express()

//Usando dependências
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use(cors());


createTable();


app.get('/lembrete', async (req, res) => {
    try {
        let lembretes = await selecionarLembretes();
        // let lembretesAgrupados = agruparLembretes(lembretes);
        res.json(lembretes);
    } catch {
        res.json({
            "statusCode": 500,
            "errorMessage": error.message
        });
    }
})

app.post('/lembrete', async (req, res) => {
    try {
        await adicionarLembrete(req.body);
        res.json({
            "statusCode": 200
        });
    } catch (error) {
        res.json({
            "statusCode": 400,
            "errorMessage": error.message
        });
    }

})

app.delete('/lembrete/:id', async (req, res) => {

    try {
        let deleteLembrete = await deletarLembrete(req.params.id);
        res.json({
            "statusCode": 200
        });
    } catch (error) {
        res.json({
            "statusCode": 500,
            "errorMessage": error.message
        });
    }
})


app.listen(3000, () => console.log("api rodando na porta http://localhost:3000"));