import { DcoreConfig } from "../../../node_modules/dcorejs/dist/types/dcorejs";
import { ConnectionState } from "../../../node_modules/dcorejs/dist/types/api/apiConnector";
import { ContentApi } from "../../../node_modules/dcorejs/dist/types/content";
import { AccountApi } from "../../../node_modules/dcorejs/dist/types/account";
import { ExplorerModule } from "../../../node_modules/dcorejs/dist/types/explorer";

interface DcoreJsAPI {
    initialize(
        config: DcoreConfig,
        dcorejs_lib: any,
        connectionStatusCallback?: (state: ConnectionState) => void
    ): void;
    content(): ContentApi;
    account(): AccountApi;
    explorer(): ExplorerModule;
}

declare const dcorejs: DcoreJsAPI;

// declare module "dcorejs" {
//     export = dcorejs;
// }
