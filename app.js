// app.js (sécurisé, court)
require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const cors = require('cors');

const app = express();
const userRoutes = require('./routes/user');

// Sécurité : enlever l'en-tête X-Powered-By
app.disable('x-powered-by');

// Headers de sécurité
app.use(helmet());

// Limiter la taille du body pour éviter DoS par payloads lourds
app.use(express.json({ limit: '10kb' }));

// CORS : configurer selon ton domaine en prod
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  methods: ['GET','POST','PUT','DELETE'],
  credentials: true
}));

// Rate limiting pour eviter le spam 
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(limiter);

// Route
app.use('/user', userRoutes);

app.get('/', (req, res) => {
  res.send('Vuln Node Project - demo');
});

// Msg d'erreurs a ne oas afficher en prod mais seukement en dev 
app.use((err, req, res, next) => {
  console.error(err); // log 
  res.status(err.status || 500).json({
    message: process.env.NODE_ENV === 'production' ? 'Internal server error' : err.message
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Listening ${PORT}`));