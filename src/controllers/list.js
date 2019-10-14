const querystring = require('querystring');
const FilterTypes = require('../utils/FilterTypes');

module.exports = async (ctx) => {
    const {request, response} = ctx;
    const body = request.body;
    const db = ctx.app.db;

    const limit = body.limit || 10;
    const offset = body.offset || 0;
    const preparedValues = [];

    /**
     * Example req body: { "sort": [{"collection":"books", "field": "title", "type": "desc"}] }
     * @type {string}
     */
    let sort = '';
    if (Array.isArray(body.sort)) {
        for (let item of body.sort) {
            let field = item.field || item;
            let type = String(item.type || 'asc').toUpperCase();
            let collection = item.collection || 'books';
            if (sort.length === 0) {
                sort = `ORDER BY ${collection}.${field} ${type}`;
            } else {
                sort += `, ${collection}.${field} ${type}`;
            }
        }
    }

    /**
     * Example req body: { "filters": [{"collection":"books", "field": "title", "type": "eq", "value": "First book"}] }
     * @type {string}
     */
    let filters = '';
    if (Array.isArray(body.filters)) {
        for (let item of body.filters) {
            if (!item.field || !item.value) continue;
            let field = item.field;
            let type = item.type || 'eq';
            let value = item.value;
            let collection = item.collection || 'books';
            if (!FilterTypes.hasOwnProperty(type)) continue;
            type = FilterTypes[type];
            if (filters.length === 0) {
                filters = `WHERE ${collection}.${field} ${type} ?`;
            } else {
                filters += ` AND ${collection}.${field} ${type}`;
            }
            preparedValues.push(value);
        }
    }

    const sql = `SELECT books.*, authors.* FROM books JOIN authors ON books.author_id = authors.id ${filters} ${sort} LIMIT ? OFFSET ?`;
    const [rows, fields] = await db.execute(
        { nestTables: '_', sql: sql },
        [...preparedValues, limit, offset],
    );

    response.body = {rows: [], limit, offset};
    for (const row of rows) {
        response.body.rows.push({
            id: row['books_id'],
            title: row['books_title'],
            description: row['books_description'],
            image: row['books_image'],
            author: {
                id: row['authors_id'],
                name: row['authors_name'],
            },
        });
    }
};
