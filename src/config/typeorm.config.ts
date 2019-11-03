import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'cezary',
  password: 'postgres',
  database: 'nestplayground',
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: true,
};
