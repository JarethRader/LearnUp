import express from 'express';

const port = process.env.PORT || 7000;

const app = express();

app.listen(port, () => console.log(`Audio API started on port ${port}`));

export default app;
