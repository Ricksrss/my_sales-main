import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";
import { TableForeignKey } from "typeorm";
export class AddCustomerIdToOrders1754947835586 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.addColumn(
        'orders',
        new TableColumn({
          name: 'customer_id',
          type: 'integer',
          isNullable: true,
        }),
      );
      await queryRunner.createForeignKey(
        'orders',
        new TableForeignKey({
          name: 'OrderCustomer',
          columnNames: ['customer_id'],
          referencedTableName: 'customers',
          referencedColumnNames: ['id'],
          onDelete: 'SET NULL'
        }),
      );
    }


    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropForeignKey('Orders', 'OrdersCustomer');
      await queryRunner.dropColumn('orders', 'customer_id');
    }

}
