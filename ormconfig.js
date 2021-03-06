module.exports = {
    type: 'mysql',
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: 'gcb_test',
    synchronize: true,
    entities: ['dist/models/*.model.js','dist/src/models/*.model.js'],
    logging: false,
    migrations: ["dist/migrations/*.[jt]*s"],
    cli: {
        migrationsDir: "src/migrations"
    }
};
