import knex from 'knex'

export const db = knex({
    client: 'mysql2',
    connection: {
        host: '192.168.10.211',
        user: 'patrick',
        password: 'abc@123',
        database: 'programas_patrick',
    }
})