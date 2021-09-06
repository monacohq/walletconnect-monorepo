import "mocha";
import { expect } from "chai";

import { IJsonRpcRequest, IEncryptionPayload } from "@deficonnect/types";
import { convertHexToArrayBuffer } from "@deficonnect/utils";

import * as IsoCrypto from "../src";

const TEST_JSON_RPC_REQUEST: IJsonRpcRequest = {
  id: 1,
  jsonrpc: "2.0",
  method: "wc_test",
  params: [],
  session: {
    chainId: 1,
    account: ""
  }
};
const TEST_KEY = "2254c5145902fe280fb035e98bea896e024b78ccab33a62a38f538c860d60339";
const TEST_IV = "81413061def750d1a8f857d98d66584d";
const TEST_ENCRYPTION_PAYLOAD: IEncryptionPayload = {
  data:
    "170ac2b0c8ba61ac268455c42eb72c452e23888c6b357bcfc1b8c4c12770690c714e2171ceee0fa4aa639bcbfb9c6b11d156e2c5bcac2eedc321489b2cb596950b62364fdb07a35e105561f01bc0393b8b67c47551c728bad90291b57a89aff9",
  hmac: "9b6ae1c61fe3bde9dfaea4f14c926b34fc3d31346c9efd54336324333ef7d51a",
  iv: "81413061def750d1a8f857d98d66584d",
};

describe("IsoCrypto", () => {
  it("encrypt successfully", async () => {
    const request = TEST_JSON_RPC_REQUEST;
    const key = convertHexToArrayBuffer(TEST_KEY);
    const iv = convertHexToArrayBuffer(TEST_IV);
    const result = await IsoCrypto.encrypt(request, key, iv);
    expect(!!result).to.be.true;
    if (!result) return;
    expect(result.data).to.eql(TEST_ENCRYPTION_PAYLOAD.data);
    expect(result.hmac).to.eql(TEST_ENCRYPTION_PAYLOAD.hmac);
    expect(result.iv).to.eql(TEST_ENCRYPTION_PAYLOAD.iv);
  });

  it("decrypt successfully", async () => {
    const payload = TEST_ENCRYPTION_PAYLOAD;
    const key = convertHexToArrayBuffer(TEST_KEY);
    const result = await IsoCrypto.decrypt(payload, key);
    expect(!!result).to.be.true;
    if (!result) return;
    expect((result as IJsonRpcRequest).id).to.eql(TEST_JSON_RPC_REQUEST.id);
    expect((result as IJsonRpcRequest).jsonrpc).to.eql(TEST_JSON_RPC_REQUEST.jsonrpc);
    expect((result as IJsonRpcRequest).method).to.eql(TEST_JSON_RPC_REQUEST.method);
    expect((result as IJsonRpcRequest).params).to.eql(TEST_JSON_RPC_REQUEST.params);
  });
});
