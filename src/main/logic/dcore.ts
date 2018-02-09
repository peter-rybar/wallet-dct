import { DcoreJsAPI } from "./dcorejsapi";
import { ConnectionState } from "dcorejs";
import { Block } from "../../../node_modules/dcorejs/dist/types/explorer";
import { HistoryRecord, Account } from "dcorejs/dist/types/account";

const dcorejs_lib = (window as any)["dcorejs-lib"];
const dcorejs = (window as any)["dcorejs"] as DcoreJsAPI;

export class DCore {

    init(chainId: string,
         dcoreNetworkWSPaths: string[],
         onState: (state: ConnectionState) => void): this {
        dcorejs.initialize(
            { chainId, dcoreNetworkWSPaths },
            dcorejs_lib,
            onState
        );
        return this;
    }

    chainProperty(): Promise<Block.ChainProperty> {
        return dcorejs.explorer().getChainProperty(0);
    }

    accountByName(accountName: string): Promise<Account> {
        return dcorejs.account().getAccountByName(accountName);
    }

    accountById(accountId: string): Promise<Account> {
        return dcorejs.account().getAccountById(accountId);
    }

    balance(accountId: string): Promise<number> {
        return dcorejs.account().getBalance(accountId);
    }

    accountHistory(accountId: string): Promise<HistoryRecord[]> {
        return dcorejs.account().getAccountHistory(accountId);
    }

    transactionHistory(accountId: string, privateKeys: string[]) {
        return dcorejs.account().getTransactionHistory(accountId, privateKeys);
    }

}

// const chainId = "17401602b201b3c45a3ad98afc6fb458f91f519bd30d1058adf6f2bed66376bc";
// const chainAddr = "wss://stage.decentgo.com:8090";

// const dcore = new DCore()
//     .init(chainId, [chainAddr],
//          state => {
//              console.log("dcorejs state:", state);
//          });

// dcore.chainProperty()
//     .then(res => console.log("chainProperty", JSON.stringify(res, null, 4)))
//     .catch((err: any) => console.error(err));

// const accountName = "ue1c1903e2753f3caa2ef4f1456e45x139";

// dcore.accountByName(accountName)
//     .then(res => console.log("accountByName", JSON.stringify(res, null, 4)))
//     .catch((err: any) => console.error(err));

// const accountId = "1.2.134";

// dcore.accountById(accountId)
//     .then(res => console.log("accountById", JSON.stringify(res, null, 4)))
//     .catch((err: any) => console.error(err));

// dcore.balance(accountId)
//     .then(balance => console.log("balance", balance))
//     .catch((err: any) => console.error(err));

// const privateKey = "5KQV5xBAKa54dzNmKg8ACwk3heomNGY5EWTAqodW7BWkbhmgXcPW";
// dcore.transactionHistory(accountId, [privateKey])
//     .then(res => console.log("transactionHistory", JSON.stringify(res, null, 4)))
//     .catch((err: any) => console.error(err));

// dcore.accountHistory(accountId)
//     .then(res => console.log("accountHistory", JSON.stringify(res, null, 4)))
//     .catch((err: any) => console.error(err));
