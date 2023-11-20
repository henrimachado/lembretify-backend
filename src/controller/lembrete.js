import { openDb } from "../database/configDb.js"
import { v4 as uuidv4 } from "uuid" //Biblioteca para gerar uid aleatórios

export async function createTable() {
    openDb().then(db => {
        db.exec('CREATE TABLE IF NOT EXISTS Lembretes (id TEXT PRIMARY KEY, titulo TEXT, data TEXT, created_at TEXT )')
    });
}

export async function adicionarLembrete(lembrete) {
    let dataLembrete = new Date(lembrete.data).setHours(0, 0, 0, 0);
    let dataAtual = new Date().setHours(0,0,0,0);
    const datasIguais = dataLembrete === dataAtual;
    
    if(lembrete.titulo.match(/.*\S.*/) && !datasIguais){
        let id = uuidv4();

        openDb().then(db => {
            db.run('INSERT INTO Lembretes (id, titulo, data, created_at) VALUES (?, ?, ?, ?)',
                    [id, lembrete.titulo, lembrete.data, Date.now()]) 
        });
    } else {
        throw new Error("Entrada inválida. Formatação inadequada.");
    }
    
}

export async function selecionarLembretes(){
    return openDb().then(db => {
        return db.all('SELECT id, titulo, data FROM Lembretes').then(res=>res)
    });
}

export async function deletarLembrete(id){
    return openDb().then(db => {
        return db.get('DELETE FROM Lembretes WHERE id=?',[id]).then(res=>res)
    });
}
