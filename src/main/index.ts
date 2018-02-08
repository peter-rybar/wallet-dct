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

import { test } from "./logic/dcore";
test();


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
