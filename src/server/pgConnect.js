const pg = require('pg');
const dotenv = require('dotenv');
dotenv.config();

console.log("connecting to", process.env.POSTGRESQL_ADDON_URI);

const pgClient = new pg.Client(process.env.POSTGRESQL_ADDON_URI);


pgClient.connect();

/******************************** CLIENT ********************************/
//Récupère tous les clients présents dans la table client
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

//Récupère tous les clients de la base de données à partir de leur nom
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

//Ajout d'un token dans dans la base de données (table Token)
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

//Récupère un token grâce à un id
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

//Récupère tous les tokens
const getTokens = async () => {
    try {
        const res = await pgClient.query({
            name:'read-all-tokens',
            text:'select token.id, username, client_id, expiration_time from client, token where client.id = token.client_id'
        });
        return res.rows;
    } catch (err) {
        console.error(err);
    }
}

const getUnexpiredToken = async () => {
    try {
        const res = await pgClient.query({
            name:'read-unexpired-tokens',
            text:'select token.id, username, client_id, expiration_time from client, token where client.id = token.client_id and expiration_time > clock_timestamp()'
        });
        return res.rows;
    } catch (err) {
        console.error(err);
    }
}

const deleteTokenById = async (id) => {
    try {
        const res = await pgClient.query({
            text:'delete from token where id =$1;',
            values:[id]
        });
    } catch (err) {
        console.error(err);
    }
}

//Récupère un client grâce à son id
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

//Ajoute un client dans la table Client
const insertClient = async({id,username,password,admin,firstname,lastname}) => {
    try {
        const res = await pgClient.query({
            text: 'INSERT INTO client (id, username, password, admin, first_name, last_name)' +
                'VALUES ($1,$2,$3,$4,$5,$6) RETURNING *;',
            values: [id,username,password,admin,firstname,lastname]
        });
        return res.rows[0];
    } catch (err) {
        console.error(err);
    }
}

/******************************** PLANNING ********************************/
//Récupère tous les plannings présents dans la table Planning
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

//Ajout d'un planning dans la base de données
const insertPlanning = async({id,name,date}) => {
    try {
        const res = await pgClient.query({
            text:'INSERT INTO planning (id, name, date)' +
                'VALUES ($1,$2,$3) RETURNING *;',
            values:[id,name, date]
        });
        return res.rows[0];
    } catch (err) {
        console.error(err);
    }
}

/******************************** MANCHE ********************************/
const getManchesByPlanningId = async (id) => {
    try {
        const res = await pgClient.query({
            name:'read-manches',
            text:'select id, name, ordre, coalesce(count(inscription.manche_id),0) as number from manche left join inscription on manche.id=inscription.manche_id where manche.planning_id=$1 group by manche.id order by ordre asc;',
            values:[id]
        });
        return res.rows;
    } catch (err) {
        console.error(err);
    }
}

const insertManche = async({id, name, ordre, planning_id}) => {
    try {
        const res = await pgClient.query({
            text:'INSERT INTO manche (id, name, ordre, planning_id)' +
                'VALUES ($1,$2,$3,$4) RETURNING *;',
            values:[id,name, ordre, planning_id]
        });
        return res.rows[0];
    } catch (err) {
        console.error(err);
    }
}

/******************************** INSCRIPTION ********************************/
const getInscriptionCountByPlanningIdAndMancheId = async (planning_id, manche_id) => {
    try {
        const res = await pgClient.query({
            name:'read-inscriptions',
            text:'select count(*) from inscription where inscription.planning_id=$1 and inscription.manche_id=$2;',
            values:[planning_id, manche_id]
        });
        return res.rows;
    } catch (err) {
        console.error(err);
    }
}

const insertUserToInscription = async ({clientId,planningId,mancheId}) => {
    try {
        const res = await pgClient.query({
            text:'INSERT INTO inscription (planning_id, manche_id, client_id)' +
                'VALUES ($1,$2,$3) RETURNING *;',
            values:[planningId,mancheId,clientId]
        });
        return res.rows[0];
    } catch (err) {
        console.error(err);
    }
}


/********************************  ********************************/
module.exports = {
    pgClient,
    getClients,
    getClientByUsername,
    getTokenById,
    getClientById,
    insertToken,
    getTokens,
    getUnexpiredToken,
    deleteTokenById,
    insertClient,
    getPlannings,
    insertPlanning,
    getManchesByPlanningId,
    insertManche,
    getInscriptionCountByPlanningIdAndMancheId,
    insertUserToInscription
}