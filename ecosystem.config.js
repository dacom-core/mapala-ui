module.exports = {
  apps : [
    {
      name      : 'Mapala UI',
      script    : 'npm',
      args      : 'start',
      env: {
        COMMON_VARIABLE: 'true',
        NODE_ENV: 'development',
        API_SERVER: 'https://mapala.net/'
      },
      env_production : {
        NODE_ENV: 'production',
        API_SERVER: 'https://mapala.net/'
      }
    },
  ],

  deploy : {
    prod : {
      user : 'root',
      host : '158.69.210.48',
      ref  : 'origin/master',
      repo : 'git@github.com:dacom-core/mapala-ui.git',
      path : '/var/www/mapala-ui',
      'post-deploy' : 'yarn install && npm run build && pm2 reload ecosystem.config.js --env prod',
      env  : {
        NODE_ENV: 'production',
        API_SERVER: 'https://mapala.net/'
      }
    },
    development : {
      user : 'root',
      host : '37.59.98.17',
      ref  : 'origin/dev',
      repo : 'git@github.com:dacom-core/mapala-ui.git',
      path : '/var/www/mapala-ui',
      'post-deploy' : 'yarn install && npm run build && pm2 reload ecosystem.config.js --env development',
      env  : {
        NODE_ENV: 'development',
        API_SERVER: 'https://dev.mapala.net/'
      }
    }
  }
};
