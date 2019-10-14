module.exports = async (ctx) => {
    const {request, response} = ctx;
    const body = request.body;
    const id = ctx.params.id;
    const db = ctx.app.db;

    if (typeof body !== 'object' || Object.keys(body).length === 0) {
        return ctx.throw(400, 'Invalid body');
    }

    const preparedValues = [];
    let updateSql = ``;
    for (let name in body) {
        if (!body.hasOwnProperty(name)) continue;
        updateSql += ` ${name} = ?,`;
        preparedValues.push(body[name]);
    }
    updateSql = updateSql.substr(0, updateSql.length - 1);

    await db.execute(`UPDATE books SET ${updateSql} WHERE id = ?`, [...preparedValues, id]);

    response.status = 204;
};
