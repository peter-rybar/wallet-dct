import { swInit } from "./sw-lib";
import { Widget } from "./prest/jsonml/jsonml-widget";
import { JsonMLs } from "./prest/jsonml/jsonml";
import { Router } from "./prest/router";
import { AppShell } from "./appshell";
import { SidebarWidget } from "./sidebar";
import { AccountsWidget, Account } from "./widgets/accounts";
import { SettingsWidget, Settings } from "./widgets/settings";
import { ContentWidget } from "./content";
import * as store from "store";
import { DCore } from "./logic/dcore";

swInit();

const sidebar =  new SidebarWidget()
    .setUser({ name: "Peter", avatar: "" });

const app = new AppShell<SidebarWidget, Widget>()
    .setTitle("Wallet DCT")
    .setSidebar(sidebar)
    .mount(document.getElementById("app"));

if (!store.get("settings")) {
    const s: Settings = {
        chainId: "17401602b201b3c45a3ad98afc6fb458f91f519bd30d1058adf6f2bed66376bc",
        chainAddr: "wss://stage.decentgo.com:8090"
    };
    store.set("settings", s);
}
const settings = store.get("settings") as Settings;
// console.log("settings", settings);

if (!store.get("account")) {
    const a: Account = {
        name: "",
        privKey: ""
    };
    store.set("account", a);
}
const account = store.get("account") as Account;
// console.log("account", account);

const settingsWidget = new SettingsWidget()
    .setTitle("Settings")
    .setSettings(settings)
    .onSave(s => store.set("settings", s));

const accountsWidget = new AccountsWidget()
    .setTitle("Account")
    .setAccount(account)
    .onSave(a => store.set("account", a));

const contents: { [kry: string]: Widget } = {
    views: new ContentWidget("Views"),
    traffic: new ContentWidget("Traffic"),
    geo: new ContentWidget("Geo")
};

Router.route("", () => {
    console.log("#");
    app.sidebarClose();
    sidebar.setHash("");
    app.setContent(new ContentWidget("Welcome"));
});
Router.route("settings", () => {
    console.log("#settings");
    app.sidebarClose();
    sidebar.setHash("settings");
    app.setContent(settingsWidget);
});
Router.route("account", () => {
    console.log("#account");
    app.sidebarClose();
    sidebar.setHash("account");
    app.setContent(accountsWidget);
});
// Router.route("*", (path: string) => {
//     console.log("#*", path);
//     app.sidebarClose();
//     sidebar.setHash(path);
//     const content = contents[path];
//     if (content) {
//         app.setTitle1(content.title);
//         app.setContent(content);
//     } else {
//         app.setTitle1(path);
//         app.setContent(new ContentWidget(path));
//     }
// });
Router.start();
// Router.navigate("settings");

const dcore = new DCore()
    .init(settings.chainId, [settings.chainAddr],
         state => {
             console.log("dcorejs state:", state);
             app.snackbar(`State: ${state}`);
             switch (state) {
                 case "open":
                    if (account.name) {
                        dcore.accountByName(account.name)
                            .then(acc => {
                                console.log("accountByName", JSON.stringify(acc, null, 4));
                                dcore.balance(acc.id)
                                    .then(balance => {
                                        app.setTitle1("balance " + balance + " DCT");
                                    })
                                    .catch((err: any) => {
                                        console.error(err);
                                        app.snackbar(`Error: ${err}`);
                                    });
                            })
                            .catch((err: any) => console.error(err));
                        }
                    break;
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
