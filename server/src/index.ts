import { connectDB } from './initDB';
import { server } from './server';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 5000;
  
const start = async () => {
    try{
        await connectDB();
        server.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (e: any) {}
}

start();