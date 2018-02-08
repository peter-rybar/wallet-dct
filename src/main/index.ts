import { swInit } from "./sw-lib";
import { Widget } from "./prest/jsonml/jsonml-widget";
import { JsonMLs } from "./prest/jsonml/jsonml";
import { Router } from "./prest/router";
import { AppShell } from "./appshell";
import { SidebarWidget } from "./sidebar";
import { ContentWidget } from "./content";

import * as store from "store";
// store.set("settings", {});
const settings = store.get("settings");
console.log("settings", settings);


import { DCore } from "./logic/dcore";

const chainId = "17401602b201b3c45a3ad98afc6fb458f91f519bd30d1058adf6f2bed66376bc";
const dcoreNetworkAddresses = ["wss://stage.decentgo.com:8090"];

const dcore = new DCore()
    .init(chainId, dcoreNetworkAddresses,
         state => console.log("dcorejs state:", state));

dcore.chainProperty()
    .then(res => console.log("chainProperty", JSON.stringify(res, null, 4)))
    .catch((err: any) => console.error(err));

const accountName = "ue1c1903e2753f3caa2ef4f1456e45139";

dcore.accountByName(accountName)
    .then(res => console.log("accountByName", JSON.stringify(res, null, 4)))
    .catch((err: any) => console.error(err));

const accountId = "1.2.134";

dcore.balance(accountId)
    .then(balance => console.log("balance", balance))
    .catch((err: any) => console.error(err));

dcore.accountHistory(accountId)
    .then(res => console.log("accountHistory", JSON.stringify(res, null, 4)))
    .catch((err: any) => console.error(err));

const privateKey = "aaa";
dcore.transactionHistory(accountId, [privateKey])
    .then(res => console.log("transactionHistory", JSON.stringify(res, null, 4)))
    .catch((err: any) => console.error(err));


class HelloWidget extends Widget {

    private _name: string;

    constructor(name: string) {
        super("HelloWidget");
        this._name = name;
    }

    setName(name: string): this {
        this._name = name;
        this.update();
        return this;
    }

    onMount() {
        console.log("onMount", this.type, this.id);
    }

    onUmount() {
        console.log("onUmount", this.type, this.id);
    }

    render(): JsonMLs {
        return [
            ["p",
                ["input.w3-input~i",
                    { type: "text", value: this._name, input: this._onTextInput }
                ],
                ["p", "Hello ", ["strong", this._name], " !"]
            ]
        ];
    }

    private _onTextInput = (e: Event) => {
        const i = e.target as HTMLInputElement;
        // const i = this.refs["i"] as HTMLInputElement;
        this._name = i.value;
        this.update();
    }

}

swInit();

const sidebar =  new SidebarWidget()
    .setUser({ name: "Peter", avatar: "" });

const app = new AppShell<SidebarWidget, Widget>()
    .setTitle("Wallet DCT")
    .setSidebar(sidebar)
    .mount(document.getElementById("app"));

const contents: { [kry: string]: ContentWidget } = {
    views: new ContentWidget("Views"),
    traffic: new ContentWidget("Traffic"),
    geo: new ContentWidget("Geo")
};

Router.route("*", (path: string) => {
    console.log("#*", path);
    app.sidebarClose();
    sidebar.setHash(path);
    const content = contents[path];
    if (content) {
        app.setTitle1(content.title);
        app.setContent(content);
    } else {
        app.setTitle1(path);
        app.setContent(new HelloWidget(path));
    }
});
Router.start();
// Router.navigate("overview");

setTimeout(() => {
    app.snackbar("Welcome");
}, 2e3);

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
