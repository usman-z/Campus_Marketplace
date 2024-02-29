import pkg from 'pg';
const { Client } = pkg;

// Function to connect to the PostgreSQL database
async function connectToDatabase() {
    const client = new Client({
        user: 'uzia',
        host: 'localhost',
        database: 'postgres',
        password: '',
        port: 5432,
    });

    try {
        await client.connect();
        console.log('Connected to PostgreSQL');
        return client;
    } catch (error) {
        console.error('Connection error', error.stack);
        throw error;
    }
}

// Function to perform database operations
async function performDatabaseOperations(client) {
    try {
        // Your database operations go here...
        // For example:
        // await client.query('SELECT * FROM your_table');

        // Close the client connection after operations
        await client.end();
        console.log('Connection closed');
    } catch (error) {
        console.error('Database operation error', error.stack);
        throw error;
    }
}

// Main function to run the script
async function main() {
    let client;
    try {
        client = await connectToDatabase();
        await performDatabaseOperations(client);
    } catch (error) {
        // Handle errors
        console.error('An error occurred:', error);
    }
}

// Run the main function
main();
