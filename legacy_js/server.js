const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// Servir archivos estáticos
app.use(express.static(__dirname));

// Ruta principal
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// SPA FALLBACK: Usar .use en lugar de .get('*')
app.use((req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`SPA Server corriendo en http://localhost:${PORT}`);
});