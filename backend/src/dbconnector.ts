import { Pool } from 'pg';

const pool = new Pool ({
    max: 20,
    connectionString: 'postgres://chatapp:chatapp@localhost:5432/chatapp',
    idleTimeoutMillis: 30000
});

export default pool;