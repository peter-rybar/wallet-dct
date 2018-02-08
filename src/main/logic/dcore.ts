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
