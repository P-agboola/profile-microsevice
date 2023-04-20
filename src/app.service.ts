import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Profile } from './profile.entity';
import { ProfileCredentialsDto } from './profileCredentials.dto';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Profile) private profileRepository: Repository<Profile>,
  ) {}

  async createProfile(
    profileCredentialsDto: ProfileCredentialsDto,
  ): Promise<Profile> {
    return await this.profileRepository.save(profileCredentialsDto);
  }

  async getProfileById(id: number): Promise<Profile> {
    return await this.profileRepository.findOneBy({ id });
  }

  async updateProfile(
    id: number,
    profileCredentials: ProfileCredentialsDto,
  ): Promise<Profile> {
    const profile = await this.profileRepository.findOneBy({ id });
    if (!profile) {
      throw new NotFoundException(`profile with ID ${id} not found`);
    }
    const firstName =
      profileCredentials.firstName === undefined
        ? profile.firstName
        : profileCredentials.firstName;
    const lastName =
      profileCredentials.lastName === undefined
        ? profile.lastName
        : profileCredentials.lastName;

    const address =
      profileCredentials.address === undefined
        ? profile.address
        : profileCredentials.address;

    const phoneNumber =
      profileCredentials.phoneNumber === undefined
        ? profile.phoneNumber
        : profileCredentials.phoneNumber;

    const updatedProfile = { firstName, lastName, address, phoneNumber };
    return this.profileRepository.save(updatedProfile);
  }
}
