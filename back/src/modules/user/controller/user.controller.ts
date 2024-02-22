import { Controller, Param, Get, Redirect } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserService } from '@user/service/user.service';

@Controller('api')
@ApiTags('User')
export class UserController {
  constructor(
    private readonly userService: UserService,
  ) {}

  @Get('register/validation/:token')
  @ApiOperation({ summary: 'Validate user account' })
  @Redirect(process.env.FRONT_URL + '/user/register/validation', 301)
  public async registerValidation(
    @Param('token') token: string
  ) {
    await this.userService.registerValidation(token);
  }
}