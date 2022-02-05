import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './configs/typeorm.config';
import { HealthCheckModule } from './health-check/health-check.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), UsersModule, HealthCheckModule],
})
export class AppModule {}
