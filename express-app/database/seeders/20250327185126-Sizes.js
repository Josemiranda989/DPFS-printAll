"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "sizes",
      [
        {
          name: "S",
        },
        {
          name: "M",
        },
        {
          name: "L",
        },
        {
          name: "XL",
        },
        {
          name: "XXL",
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("sizes", null, {});
  },
};
