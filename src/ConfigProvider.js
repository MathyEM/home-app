import dotenv from 'dotenv';
dotenv.config();

export default class ConfigProvider {
  static get CONFIG() {
    return {
      hueBridgeIP: "$VUE_APP_HUE_BRIDGE_IP",
      hueUsername: "$VUE_APP_HUE_USERNAME",
      pollingRate: "$VUE_APP_POLLING_RATE",
    };
  }

  static value(name) {
    if (!(name in this.CONFIG)) {
      return;
    }

    const value = this.CONFIG[name];

    if (!value) {
      return;
    }

    if (value.startsWith('$VUE_APP_')) {
      const envName = value.substr(1);
      const envValue = process.env[envName];
      if (envValue) {
        return envValue;
      } else {
        return
      }
    } else {
      return value;
    }
  }
}