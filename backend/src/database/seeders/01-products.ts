import { QueryInterface } from 'sequelize';

export default {
  async up(queryInterface: QueryInterface) {
    await queryInterface.bulkInsert('products', [
      {
        product_name: 'produtoX',
        price: 100,
        description: 'O melhor produtoX do mercado',
        product_image: 'https://picsum.photos/200/300',
        seller_id: 1
      }
    ]);
  },
  async down(queryInterface: QueryInterface) {
    await queryInterface.bulkDelete('products', {});
  }
};
