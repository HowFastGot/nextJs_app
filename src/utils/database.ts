import mongoose from 'mongoose';

let isConnected = false;

export async function connectToDB() {
	mongoose.set('strictQuery', true);

	if (isConnected) {
		console.log('Mongoose is already connected!');
		return;
	}

	try {
		const mongooseOptions: mongoose.ConnectOptions = {
			dbName: 'share_prompts',
			heartbeatFrequencyMS: 2000,
		};
		await mongoose.connect(
			process.env.MONGODB_URI ?? 'unknown',
			mongooseOptions
		);

		isConnected = true;

		console.log('MongoDB is connected!');
	} catch (error) {
		console.log('Error happend while MongoDB was connecting!');
		return false;
	}
}
