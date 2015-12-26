'use strict';

// Test specific configuration
// ===========================
module.exports = {
  // MongoDB connection options
  mongo: {
    uri: 'mongodb://localhost/shoprun-test'
  },
  sequelize: {
    uri: process.env.MYSQL_TEST_URL,
    options: {
      logging: false,
      define: {
        timestamps: false
      }
    }
  }
};
