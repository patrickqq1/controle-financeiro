import knex from 'knex'

export const db = knex({
    client: 'mysql2',
    connection: {
        host: '193.203.174.253',
        user: 'patrick',
        password: 'abc@123',
        database: 'controlefinanc',
    }
})