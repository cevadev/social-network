const config = {
    //dbUrl: process.env.DB_URL || 'mongodb://user:user1234@ds255107.mlab.com:55107/telegrom',
    /* dbUrl: process.env.DB_URL || 'mongodb+srv://barcvilla:root@cluster0.nldop.mongodb.net/platzimessages_db?retryWrites=true&w=majority',
    port: process.env.PORT || 3000,
    host: process.env.HOST || 'http://localhost',
    publicRoute: process.env.PUBLIC_ROUTE || '/app',
    filesRoute: process.env.FILES_ROUTE || 'files', */
    host: process.env.HOST || 'http://localhost',
    port: process.env.PORT || 3000,
    mysqlHost: process.env.MYSQL_HOST || 'localhost',
    mysqPort: process.env.MYSQL_PORT || '3306',
    mysqlUser: process.env.MYSQL_USER || 'root',
    mysqlpassword: process.env.MYSQL_PASSWORD || 'admin',
    mysqlDataBase: process.env.MYSQL_DATABASE || 'nodedb',
    
    secret: process.env.SECRET || 'notasecret',

    //mysqlService
    mysqlServiceHost: process.env.MYSQL_SERVICE_HOST || 'localhost',
    mysqlServicePort: process.env.MYSQL_SERVICE_PORT || '3001',

    //postService
    postPort: process.env.POST_PORT || '3002',

    //remoteDB
    remoteDB: process.env.REMOTE_DB || false,

    //chacheService
    cacheServiceHost: process.env.CACHE_SERVICE_HOST || 'localhost',
    cacheServicePort: process.env.CACHE_SERVICE_PORT || '3003',

    //redis
    redisHost: process.env.REDIS_HOST || 'redis-19132.c10.us-east-1-2.ec2.cloud.redislabs.com',
    redisPort: process.env.REDIS_PORT || 19132,
    redisPassword: process.env.REDIS_PASS ||'Pc4xZRsyMzCFfESmyOCg2iiMUY1oYmER',
};

module.exports = config;