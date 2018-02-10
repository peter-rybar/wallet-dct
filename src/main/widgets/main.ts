import { Widget } from "../prest/jsonml/jsonml-widget";
import { JsonMLs } from "../prest/jsonml/jsonml";

export class MainWidget extends Widget {

    constructor() {
        super("MainWidget");
    }

    onMount() {
        console.log("onMount", this.type, this.id);
    }

    onUmount() {
        console.log("onUmount", this.type, this.id);
    }

    render(): JsonMLs {
        return [
            ["h2", "Wallet DCT"],
            ["p",
                "Web/Mobile Wallet application (PWA)"
            ],
            ["ul",
                ["li", ["a", { href: "https://decent.ch/", target: "_blank" }, "DECENT web page"]],
                ["li", ["a", { href: "https://dcore.decent.ch/", target: "_blank" }, "DCore product page"]],
                ["li", ["a", { href: "https://en.wikipedia.org/wiki/DECENT_Network", target: "_blank" }, "Wiki - DECENT_Network"]],
            ]
        ];
    }

}
