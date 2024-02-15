import mysql from 'mysql'

const connection = mysql.createConnection({
    host: 'localhost', 
    port: 6000,
    user: 'root',
    password: '',
    database: 'glu'
});

export function getAll(callback) {
    const sql = 'SELECT * FROM student'

    connection.query(sql, (err, results) => {
        if (err) {
            callback(err, null);
            return;
        }
        callback(null, results);
    });
}