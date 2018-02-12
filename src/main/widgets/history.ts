import { Widget } from "../prest/jsonml/jsonml-widget";
import { JsonMLs } from "../prest/jsonml/jsonml";
import { Signal } from "../prest/signal";
import { DCore } from "../logic/dcore";

export class HistoryWidget extends Widget {

    private _title: string = "Form";
    private _transactions: number[] = [1, 2, 3, 4, 5];

    readonly sigData = new Signal<FormData>();

    constructor() {
        super("HistoryWidget");
    }

    getTitle(): string {
        return this._title;
    }

    setTitle(title: string): this {
        this._title = title;
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
            ["h2", this._title],
            ...this._transactions.map(t => {
                return (
                    ["div.w3-card-12",
                        ["header.w3-container",
                            ["h4",
                                ["b", "5 DCT"],
                                ["span", " paid to "],
                                ["b", "u76f283e699e6b25cd6750a5532fee3fa"]
                            ]
                        ],
                        ["div.w3-container",
                            ["p",
                                ["span", "Transaction fee "],
                                ["b", "0.005 DCT"]],
                            ["p", new Date()]
                        ],
                        ["hr"]
                    ]);
            })
        ];
    }

}
