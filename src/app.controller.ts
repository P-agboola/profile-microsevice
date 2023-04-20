import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ProfileCredentialsDto } from './profileCredentials.dto';
import { Profile } from './profile.entity';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern({ cmd: 'createProfile' })
  async createProfile(
    @Payload() profileCredentialsDto: ProfileCredentialsDto,
  ): Promise<Profile> {
    return await this.appService.createProfile(profileCredentialsDto);
  }

  @MessagePattern({ cmd: 'getProfileById' })
  async getProfileById(id: number): Promise<Profile> {
    return await this.appService.getProfileById(id);
  }

  @MessagePattern({ cmd: 'UpdateProfile' })
  async updateProfile(
    id: number,
    profileCredentialsDto: ProfileCredentialsDto,
  ): Promise<Profile> {
    return await this.appService.updateProfile(id, profileCredentialsDto);
  }
}
