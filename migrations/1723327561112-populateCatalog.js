const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class PopulateCatalog1723327561112 {

    async up(queryRunner) {
        await queryRunner.query(`INSERT INTO gender_catalog (title) VALUES ('unisex')`);
    }

    async down(queryRunner) {
        await queryRunner.query(`DELETE FROM gender_catalog WHERE title = 'unisex'`);
    }

}
