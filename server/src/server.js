import cors from 'cors';
import express from 'express';
import 'dotenv/config';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.listen(PORT, () => {
  console.log(`서버를 시작하였습니다. localhost:${PORT}`);
});
