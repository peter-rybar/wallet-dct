import { DcoreJsAPI } from "./dcorejsapi";

const chainId = "17401602b201b3c45a3ad98afc6fb458f91f519bd30d1058adf6f2bed66376bc";
const dcoreNetworkAddresses = ["wss://stage.decentgo.com:8090"];

const dcorejs_lib = (window as any)["dcorejs-lib"];
const dcorejs = (window as any)["dcorejs"] as DcoreJsAPI;

export function test() {
    dcorejs.initialize(
        {
            chainId: chainId,
            dcoreNetworkWSPaths: dcoreNetworkAddresses
        },
        dcorejs_lib,
        (state: any) => console.log("dcorejs state:", state));

    dcorejs.explorer().getChainProperty(0)
        .then((res: any) => {
            console.log("ChainProperty", JSON.stringify(res, null, 4));
        });

    const accountName = "ue1c1903e2753f3caa2ef4f1456e45139";
    dcorejs.account().getAccountByName(accountName)
            .then((res: any) => {
                console.log("AccountByName", JSON.stringify(res, null, 4));
            })
            .catch((err: any) => {
                console.error(err);
            });

    const accountId = "1.2.134";
    dcorejs.account().getAccountHistory(accountId)
        .then((res: any) => {
            console.log("AccountHistory", JSON.stringify(res, null, 4));
        })
        .catch((err: any) => {
            console.error(err);
        });

    const privateKey = "aaa";
    dcorejs.account().getTransactionHistory(accountId, [privateKey])
        .then((res: any) => {
            console.log("TransactionHistory", JSON.stringify(res, null, 4));
        })
        .catch((err: any) => {
            console.error(err);
        });
}
