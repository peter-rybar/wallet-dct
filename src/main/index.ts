import { swInit } from "./sw-lib";
import { Widget } from "./prest/jsonml/jsonml-widget";
import { JsonMLs } from "./prest/jsonml/jsonml";
import { Router } from "./prest/router";
import { AppShell } from "./appshell";
import { SidebarWidget } from "./sidebar";
import { MainWidget } from "./widgets/main";
import { HistoryWidget } from "./widgets/history";
import { TransferWidget } from "./widgets/transfer";
import { AccSettingsWidget, AccSettings } from "./widgets/accsettings";
import { BcSettingsWidget, BcSettings } from "./widgets/bcsettings";
import { DCore } from "./logic/dcore";
// import * as store from "store";
import { defineLocale } from "moment";

declare const store: any;

swInit();

const sidebar =  new SidebarWidget()
    .setUser({ name: "Peter", avatar: "" });

const app = new AppShell<SidebarWidget, Widget>()
    .setTitle("Wallet DCT")
    .setSidebar(sidebar)
    .mount(document.getElementById("app"));

if (!store.get("blockchain")) {
    const bs: BcSettings = {
        chainId: "17401602b201b3c45a3ad98afc6fb458f91f519bd30d1058adf6f2bed66376bc",
        chainAddr: "wss://stage.decentgo.com:8090"
    };
    store.set("blockchain", bs);
}
const settings = store.get("blockchain") as BcSettings;
// console.log("blockchain", settings);

if (!store.get("account")) {
    const as: AccSettings = {
        name: "",
        privKey: ""
    };
    store.set("account", as);
}
const account = store.get("account") as AccSettings;
// console.log("account", account);

const mainWidget = new MainWidget();

const historyWidget = new HistoryWidget()
    .setTitle("History");

const transferWidget = new TransferWidget()
    .setTitle("Transfer");

const bcSettingsWidget = new BcSettingsWidget()
    .setTitle("Blockchain")
    .setSettings(settings)
    .onSave(s => store.set("blockchain", s));

const accSettingsWidget = new AccSettingsWidget()
    .setTitle("Account")
    .setAccount(account)
    .onSave(a => store.set("account", a));

const contents: { [kry: string]: Widget } = {
    "history": historyWidget,
    "transfer": transferWidget,
    "settings-bc": bcSettingsWidget,
    "settings-acc": accSettingsWidget
};

Router.route("*", (path: string) => {
    console.log("#*", path);
    app.sidebarClose();
    sidebar.setHash(path);
    const content = contents[path];
    if (content) {
        app.setContent(content);
    } else {
        if (path) {
            Router.navigate("");
        } else {
            app.setContent(mainWidget);
        }
    }
});
Router.start();
if (!store.get("account")) {
    Router.navigate("settings-acc");
}

const dcore = new DCore()
    .init(settings.chainId, [settings.chainAddr],
         state => {
             console.log("dcorejs state:", state);
             switch (state) {
                 case "open":
                    app.snackbar("Blockchain connected");
                    break;
                default:
                    app.snackbar(`State: ${state}`);
             }
         });


// setTimeout(() => {
//     app.snackbar("Welcome");
// }, 2e3);

// setTimeout(() => {
//     showNotification("Notif title", {
//         body: "Notif body",
//         icon: "assets/icons/ic-face.png",
//         tag: "notif-tag"
//         // vibrate: [200, 100, 200, 100, 200, 100, 200],
//         // data: {
//         //     dateOfArrival: Date.now(),
//         //     primaryKey: 1
//         // },
//         // actions: [
//         //     {action: "explore", title: "Explore this new world",
//         //         icon: "images/checkmark.png"},
//         //     {action: "close", title: "Close notification",
//         //         icon: "images/xmark.png"},
//         // ]
//     });
// }, 300e3);

(self as any).app = app;

(self as any).VERSION = "@VERSION@";
