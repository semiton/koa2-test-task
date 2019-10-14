const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const mysql = require('mysql2/promise');
const seed = require('./seed');
const routes = require('./routes');

async function main() {
	const app = new Koa();
	
	app.db = await mysql.createConnection({
		host: process.env.DB_HOST || 'localhost',
		user: process.env.DB_USER || 'root',
		password: process.env.DB_PASSWORD || null,
		database: process.env.DB_NAME || 'test'
	});

	app.use(bodyParser({urlencoded: true, json: true}));
	app.use(routes);
	app.listen(process.env.PORT || 3000);

	await seed(app.db);
}

main().then().catch(error => {
	console.error(error);
	process.exit(-1);
});
