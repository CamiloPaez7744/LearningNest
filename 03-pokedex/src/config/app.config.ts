export const AppConfiguration = () => ({
  environment: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 4000,
  mongodb: process.env.MONGODB || 'mongodb://localhost/nest-pokedex',
  defaultLimit: parseInt(process.env.DEFAULT_LIMIT || '10', 10),
});
