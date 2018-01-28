import { Widget } from "../prest/jsonml/jsonml-widget";
import { JsonMLs } from "../prest/jsonml/jsonml";
import { Signal } from "../prest/signal";

export class PaymentsWidget extends Widget {

    private _title: string = "Form";
    private _transactions: number[] = [0, 1, 2];

    readonly sigData = new Signal<FormData>();

    constructor() {
        super("PaymentsWidget");
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
            ...this._transactions.map(transaction => {
                return ["ul.w3-ul",
                    ["li.w3-bar",
                        ["span.w3-bar-item.w3-button.w3-xlarge.w3-right", "&times;"],
                        ["div.w3-bar-item w3-circle", new Date()],
                        ["div.w3-bar-item",
                            ["span.w3-large", "Mike "],
                            ["br"],
                            ["span", "Web Designer"]
                        ]
                    ]
                ];
            })
        ];
    }
}