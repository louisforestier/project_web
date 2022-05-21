const pg = require('pg');
const dotenv = require('dotenv');
dotenv.config();

console.log("connecting to", process.env.POSTGRESQL_ADDON_URI);

const pgClient = new pg.Client(process.env.POSTGRESQL_ADDON_URI);


pgClient.connect();

const getClients = async () => {
    try {
        const res = await pgClient.query({
            name:'read-clients',
            text:'select * from client'
        });
        return res.rows;
    } catch (err) {
        console.error(err);
    }
}

const getClientByUsername = async (username) => {
    try {
        const res = await pgClient.query({
            name:"read-client-"+username,
            text:'select id, username, password from client where username=$1;',
            values:[username]
        });
        return res.rows[0];
    } catch (err) {
        console.error(err);
    }
}

const insertToken = async({id,client,expiration_time}) => {
    try {
        const res = await pgClient.query({
            text:'INSERT INTO token (id, client_id, expiration_time)' +
                'VALUES ($1,$2,$3) RETURNING *;',
            values:[id,client,expiration_time]
        });
        return res.rows[0];
    } catch (err) {
        console.error(err);
    }
}

const getTokenById = async (id) => {
    try {
        const res = await pgClient.query({
            name:"read-token-"+id,
            text:'select id, client_id, expiration_time from token where id=$1;',
            values:[id]
        });
        return res.rows[0];
    } catch (err) {
        console.error(err);
    }
}

const getClientById = async (id) => {
    try {
        const res = await pgClient.query({
            name:"read-client-"+id,
            text:'select * from client where id=$1;',
            values:[id]
        });
        return res.rows[0];
    } catch (err) {
        console.error(err);
    }
}

//PLANNING
const getPlannings = async () => {
    try {
        const res = await pgClient.query({
            name:'read-plannings',
            text:'select * from planning'
        });
        return res.rows;
    } catch (err) {
        console.error(err);
    }
}

module.exports = {
    pgClient,
    getClients,
    getClientByUsername,
    getTokenById,
    getClientById,
    insertToken,
    getPlannings
}