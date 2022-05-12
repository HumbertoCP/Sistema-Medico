import { MigrationInterface, QueryRunner } from "typeorm";

export class PopulateSpecialites1652307664012 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `INSERT INTO speciality_model (id, speciality) VALUES ('1', 'Alergologia');`,
        );
        await queryRunner.query(
            `INSERT INTO speciality_model (id, speciality) VALUES ('2', 'Angiologia');`,
        );
        await queryRunner.query(
            `INSERT INTO speciality_model (id, speciality) VALUES ('3', 'Buco maxilo');`,
        );
        await queryRunner.query(
            `INSERT INTO speciality_model (id, speciality) VALUES ('4', 'Cardiologia clínica');`,
        );
        await queryRunner.query(
            `INSERT INTO speciality_model (id, speciality) VALUES ('5', 'Cardiologia infantil');`,
        );
        await queryRunner.query(
            `INSERT INTO speciality_model (id, speciality) VALUES ('6', 'Cirurgia cabeça e pescoço');`,
        );
        await queryRunner.query(
            `INSERT INTO speciality_model (id, speciality) VALUES ('7', 'Cirurgia cardiádica');`,
        );
        await queryRunner.query(
            `INSERT INTO speciality_model (id, speciality) VALUES ('8', 'Cirurgia de tórax');`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        'DELETE FROM speciality_model;'
    }
}
