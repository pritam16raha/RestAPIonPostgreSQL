import express from 'express';
const app = express();
const PORT = 3000;
import router from './src/user/routes';
app.use(express.json());

app.use('/api/v1', router);

app.listen(PORT, () => console.log(`Connecting through ${PORT}`));