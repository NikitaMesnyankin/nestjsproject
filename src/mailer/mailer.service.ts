import { Injectable, Logger } from "@nestjs/common";
import * as mailer from "nodemailer";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class MailerService {
  private readonly configService: ConfigService;
  private transporter: mailer.Transporter;
  constructor() {
    this.transporter = mailer.createTransport({
      service: "gmail",
      auth: {
        user: "MAILUSER",
        pass: "ZWBG",
      },
    });
  }

  async sendEmail(mailPayload: mailer.SendMailOptions) {
    const sentEmail = await this.transporter.sendMail(mailPayload);
    Logger.error(JSON.stringify(sentEmail));
  }
}
