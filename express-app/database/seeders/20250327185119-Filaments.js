"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "filaments",
      [
        { name: "PLA" },
        { name: "ABS" },
        { name: "TPU" },
        { name: "Nylon" },
        { name: "PC" },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("filaments", null, {});
  },
};
