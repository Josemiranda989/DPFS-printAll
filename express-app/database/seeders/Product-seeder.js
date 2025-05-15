"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "products",
      [
        {
          name: "Clip para bolsa",
          description: "Clip impreso en una sola pieza",
          price: 500,
          available: 1,
          image: "default.png",
          category_id: 1,
          filament_id: 2,
          size_id: 3,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("products", null, {});
  },
};
