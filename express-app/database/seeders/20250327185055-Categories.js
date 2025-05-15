"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "categories",
      [
        { name: "Deco" },
        { name: "Figuras" },
        { name: "Juegos" },
        { name: "Soportes" },
        { name: "Llaveros" },
        { name: "Floreros" },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("categories", null, {});
  },
};
