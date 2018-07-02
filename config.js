exports.DATABASE_URL = process.env.DATABASE_URL || global.DATABASE_URL || 'mongodb://admin:administrator123@ds221271.mlab.com:21271/lesson-planner';
exports.TEST_DATABASE_URL = process.env.TEST_DATABASE_URL ||
    'mongodb://admin:administrator123@ds221271.mlab.com:21271/lesson-planner';
exports.PORT = process.env.PORT || 8080;
