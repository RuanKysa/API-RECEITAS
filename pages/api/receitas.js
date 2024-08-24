import fs from 'fs';
import path from 'path';

const isDevelopment = process.env.NODE_ENV === 'development';

let receitasPath, idPath;
if (isDevelopment) {
    receitasPath = path.resolve('.', 'data', 'receitas.json');
    idPath = path.resolve('.', 'data', 'id.json');
}

const ensureFileExists = (filePath, initialData = []) => {
    if (isDevelopment && !fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, JSON.stringify(initialData, null, 2));
    }
};

if (isDevelopment) {
    ensureFileExists(receitasPath);
    ensureFileExists(idPath, { lastId: "0" });
}

const getNextId = () => {
    if (isDevelopment && fs.existsSync(idPath)) {
        const { lastId } = JSON.parse(fs.readFileSync(idPath, 'utf8'));
        const nextId = (parseInt(lastId, 10) + 1).toString();
        fs.writeFileSync(idPath, JSON.stringify({ lastId: nextId }));
        return nextId;
    } else {
        return null;
    }
};

export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            if (isDevelopment) {
                const receitas = JSON.parse(fs.readFileSync(receitasPath, 'utf8'));
                res.status(200).json(receitas);
            } else {
                res.status(200).json([]);
            }
        } catch (error) {
            res.status(500).json({ message: 'Erro ao ler o arquivo de receitas' });
        }
    } else if (req.method === 'POST') {
        try {
            if (isDevelopment) {
                const novaReceita = req.body;
                const receitas = JSON.parse(fs.readFileSync(receitasPath, 'utf8'));
                novaReceita.id = getNextId();
                receitas.push(novaReceita);
                fs.writeFileSync(receitasPath, JSON.stringify(receitas, null, 2));
                res.status(201).json(novaReceita);
            } else {
                res.status(500).json({ message: 'Operação não permitida no ambiente de produção' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Erro ao adicionar a receita' });
        }
    } else {
        res.setHeader('Allow', ['GET', 'POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
