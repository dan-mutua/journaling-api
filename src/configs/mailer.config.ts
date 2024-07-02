import { registerAs } from '@nestjs/config';
import toBoolean from 'src/utils/toBoolean';

export default registerAs('mail', () => ({
  port: parseInt(process.env.MAIL_PORT, 10),
  host: process.env.MAIL_HOST,
  user: process.env.MAIL_USER,
  password: process.env.MAIL_PASSWORD,
  defaultEmail: process.env.MAIL_DEFAULT_EMAIL,
  defaultName: process.env.MAIL_DEFAULT_NAME,
  ignoreTLS: toBoolean(process.env.MAIL_IGNORE_TLS),
  secure: toBoolean(process.env.MAIL_SECURE),
  requireTLS: toBoolean(process.env.MAIL_REQUIRE_TLS),
}));
