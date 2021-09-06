import Connector from "@defilink/core";
import { IWalletConnectOptions, IPushServerOptions } from "@defilink/types";
import * as cryptoLib from "@defilink/iso-crypto";

class WalletConnect extends Connector {
  constructor(connectorOpts: IWalletConnectOptions, pushServerOpts?: IPushServerOptions) {
    super({
      cryptoLib,
      connectorOpts,
      pushServerOpts,
    });
  }
}

export default WalletConnect;
