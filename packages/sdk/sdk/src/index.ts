import WalletConnect from "@deficonnect/client";
import QRCodeModal from "@deficonnect/qrcode-modal";
import Web3Provider from "@deficonnect/web3-provider";
import { isNode } from "@deficonnect/utils";
import {
  IWalletConnectSDKOptions,
  IConnector,
  ICreateSessionOptions,
  IWalletConnectProviderOptions,
  IWCRpcConnectionOptions,
  IWalletConnectStarkwareProviderOptions,
  IWalletConnectOptions,
} from "@deficonnect/types";

class WalletConnectSDK {
  public connector: IConnector | undefined;
  constructor(private options?: IWalletConnectSDKOptions) {}

  get connected() {
    if (this.connector) {
      return this.connector.connected;
    }
    return false;
  }

  public async connect(createSessionOpts?: ICreateSessionOptions): Promise<IConnector> {
    const options: IWalletConnectOptions = {
      bridge: "https://bridge.walletconnect.org",
      qrcodeModal: QRCodeModal,
      ...this.options,
    };
    if (isNode()) {
      options.clientMeta = this.options?.clientMeta || {
        name: "WalletConnect SDK",
        description: "WalletConnect SDK in NodeJS",
        url: "#",
        icons: ["https://walletconnect.org/walletconnect-logo.png"],
      };
    }
    const connector = new WalletConnect(options);
    await connector.connect(createSessionOpts);
    this.connector = connector;
    return connector;
  }

  public getWeb3Provider(opts?: IWalletConnectProviderOptions) {
    if (!this.connector) {
      throw new Error("No connector available - please call connect() first");
    }
    return new Web3Provider({ ...opts, connector: this.connector });
  }

  public getChannelProvider(opts?: IWCRpcConnectionOptions) {
    if (!this.connector) {
      throw new Error("No connector available - please call connect() first");
    }
    throw new Error("Deprecated");
  }

  public getStarkwareProvider(opts: IWalletConnectStarkwareProviderOptions) {
    if (!this.connector) {
      throw new Error("No connector available - please call connect() first");
    }
    throw new Error("Deprecated");
  }

  public getThreeIdProvider(opts?: IWCRpcConnectionOptions) {
    if (!this.connector) {
      throw new Error("No connector available - please call connect() first");
    }
    throw new Error("Deprecated");
  }
}

export default WalletConnectSDK;
