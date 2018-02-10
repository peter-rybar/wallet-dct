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
                "Web Wallet application (PWA)"
            ]
        ];
    }

}
