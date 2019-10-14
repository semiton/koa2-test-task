module.exports = async (db) => {
	if (process.env.SEED === 'false') return;

	// await db.execute('DROP TABLE IF EXISTS books');
	// await db.execute('DROP TABLE IF EXISTS authors');
	// await db.execute(`
	// 	CREATE TABLE books (
	// 		id INT(11) NOT NULL AUTO_INCREMENT,
	// 		title VARCHAR(100) NOT NULL,
	// 		date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
	// 		author_id INT(11) NOT NULL,
	// 		description TEXT NULL,
	// 		image VARCHAR(300) NULL DEFAULT NULL,
	// 		PRIMARY KEY (id),
	// 		FULLTEXT (title, description)
	// 	) ENGINE = InnoDB;
	// `);
	// await db.execute(`
	// 	CREATE TABLE test.authors (
	// 		id INT(11) NOT NULL AUTO_INCREMENT,
	// 		name VARCHAR (50) NOT NULL,
	// 		PRIMARY KEY (id),
	// 		INDEX (name)
	// 	) ENGINE = InnoDB;
	// `);
	// await db.execute(`
	// 	ALTER TABLE books ADD FOREIGN KEY (author_id) REFERENCES authors(id) ON DELETE CASCADE ON UPDATE CASCADE;
	// `);
};
