import { IsString } from "class-validator";

export class RegisterAuthDto {
  @IsString()
  email: string;

  @IsString()
  password: string;

  @IsString()
  name: string;
}