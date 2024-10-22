const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class PopulateCatalog1723326505640 {

    async up(queryRunner) {
        await queryRunner.query(`INSERT INTO gender_catalog (title) VALUES ('hombre')`);
        await queryRunner.query(`INSERT INTO gender_catalog (title) VALUES ('mujer')`);
    }

    async down(queryRunner) {
        await queryRunner.query(`DELETE FROM gender_catalog WHERE title = 'hombre'`);
        await queryRunner.query(`DELETE FROM gender_catalog WHERE title = 'mujer'`);
    }

}
