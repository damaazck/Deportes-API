import express from 'express';
import fs from "fs";

const app = express();

app.use(express.json());

const readData = () => {
    try {
        const data = fs.readFileSync("./db.json");
        return JSON.parse(data);
    } catch (error) {
        console.log(error);
    }
};

const writeData = (data) => {
    try {
        fs.writeFileSync("./db.json", JSON.stringify(data, null, 2));
    } catch (error) {
        console.log(error);
    }
};

app.get("/", (req, res) => {
    res.send("API de Deportes. Agregue /deportes en el buscador para ver los datos.");
});

app.get("/deportes", (req, res) => {
    const data = readData();
    res.json(data.deportes);
});

app.get("/deportes/:id", (req, res) => {
    const data = readData();
    const id = parseInt(req.params.id);

    const deporte = data.deportes.find(
        (item) => item.id === id
    );

    if (!deporte) {
        return res.status(404).json({ mensaje: "Deporte no encontrado" });
    }

    res.json(deporte);
});

app.listen(3000, () => {
    console.log('Servidor escuchando por el puerto 3000');
});