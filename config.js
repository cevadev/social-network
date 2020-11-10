const config = {
    //dbUrl: process.env.DB_URL || 'mongodb://user:user1234@ds255107.mlab.com:55107/telegrom',
    /* dbUrl: process.env.DB_URL || 'mongodb+srv://barcvilla:root@cluster0.nldop.mongodb.net/platzimessages_db?retryWrites=true&w=majority',
    port: process.env.PORT || 3000,
    host: process.env.HOST || 'http://localhost',
    publicRoute: process.env.PUBLIC_ROUTE || '/app',
    filesRoute: process.env.FILES_ROUTE || 'files', */
    host: process.env.HOST || 'http://localhost',
    port: process.env.PORT || 3000,
    mysqlHost: process.env.MYSQL_HOST || '127.0.0.1',
    mysqPort: process.env.MYSQL_PORT || '3306',
    mysqlUser: process.env.MYSQL_USER || 'root',
    mysqlpassword: process.env.MYSQL_PASSWORD || 'admin',
    mysqlDataBase: process.env.MYSQL_DATABASE || 'nodedb',
    secret: process.env.SECRET || 'notasecret'
};

module.exports = config;