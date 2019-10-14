module.exports = async (ctx) => {
    const {request, response} = ctx;
    const body = request.body;
    const db = ctx.app.db;

    if (!body || !body.title || !body.author || !(body.author.id || body.author.name)) {
        return ctx.throw(400, 'Invalid body');
    }

    if (!body.author.id) {
        const [results, fields] = await db.execute('INSERT INTO authors SET name = ?', [body.author.name]);
        body.author.id = results.insertId;
    }

    await db.execute('INSERT INTO books SET author_id = ?, title = ?, description = ?, image = ?', [
        body.author.id,
        body.title,
        body.description || null,
        body.image || null,
    ]);

    response.status = 204;
};
