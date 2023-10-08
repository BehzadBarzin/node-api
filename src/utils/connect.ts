import mongoose from 'mongoose';
import config from 'config';

async function connect() {
    const dbUri = config.get<string>('dbUri');
    try {
        await mongoose.connect(dbUri);    
       console.log('Connected to Database.');
    } catch (error) {
        console.log('Couldn\'t connect to Database.');
        process.exit(1);
    }
}


export default connect;