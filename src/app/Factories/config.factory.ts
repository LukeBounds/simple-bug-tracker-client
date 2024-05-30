import { ConfigService } from "../Services/config.service";

export const configFactory = (configService: ConfigService) => {
    return () => configService.loadConfig();
};