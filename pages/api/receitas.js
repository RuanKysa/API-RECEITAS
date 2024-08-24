import fs from 'fs';
import path from 'path';

const receitasPath = path.resolve('.', 'data', 'receitas.json');
const idPath = path.resolve('.', 'data', 'id.json');

const ensureFileExists = (filePath, initialData = []) => {
    if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, JSON.stringify(initialData, null, 2));
    }
};

ensureFileExists(receitasPath);
ensureFileExists(idPath, { lastId: "0" });

const getNextId = () => {
    if (fs.existsSync(idPath)) {
        const { lastId } = JSON.parse(fs.readFileSync(idPath, 'utf8'));
        const nextId = (parseInt(lastId, 10) + 1).toString();
        fs.writeFileSync(idPath, JSON.stringify({ lastId: nextId }));
        return nextId;
    } else {
        fs.writeFileSync(idPath, JSON.stringify({ lastId: "0" }));
        return "1";
    }
};

export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            const receitas = JSON.parse(fs.readFileSync(receitasPath, 'utf8'));
            res.status(200).json(receitas);
        } catch (error) {
            res.status(500).json({ message: 'Erro ao ler o arquivo de receitas' });
        }
    } else if (req.method === 'POST') {

        try {
            const novaReceita = req.body;
            const receitas = JSON.parse(fs.readFileSync(receitasPath, 'utf8'));
 
            novaReceita.id = getNextId();
            

            receitas.push(novaReceita);
            fs.writeFileSync(receitasPath, JSON.stringify(receitas, null, 2));
            
            res.status(201).json(novaReceita);
        } catch (error) {
            res.status(500).json({ message: 'Erro ao adicionar a receita' });
        }
    } else {
        res.setHeader('Allow', ['GET', 'POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
