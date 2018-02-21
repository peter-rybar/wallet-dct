import { Widget } from "../prest/jsonml/jsonml-widget";
import { JsonMLs } from "../prest/jsonml/jsonml";
import { Signal } from "../prest/signal";

export class HistoryWidget extends Widget {

    private _title: string = "Form";

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
            ["p",
                ["input.w3-input.w3-border.w3-padding",
                    {
                        type: "text",
                        placeholder: "Search..."
                    }
                ]
            ],
            ["ul.w3-ul.w3-white.w3-hoverable",
                ["li.w3-bar",
                    ["span.w3-bar-item.w3-large.w3-right",
                        "2.53 DCT",
                        ["br"],
                        ["span.w3-small", "0.05 DCT"]
                    ],
                    ["div.w3-bar-item",
                        ["span.w3-large", "Mike"],
                        ["br"],
                        ["span", "Web Designer"]
                    ]
                ],
                ["li.w3-bar",
                    ["span.w3-bar-item.w3-large.w3-right",
                        "2.53 DCT",
                        ["br"],
                        ["span.w3-small", "0.05 DCT"]
                    ],
                    ["div.w3-bar-item",
                        ["span.w3-large", "Mike"],
                        ["br"],
                        ["span", "Web Designer"]
                    ]
                ]
            ],
            ["br"],
            ["div.w3-bar.w3-center",
                ["a.w3-button.w3-xlarge", { href: "#" }, "«"],
                ["a.w3-button", { href: "#" }, "1"],
                ["a.w3-button.w3-border.w3-border-blue", { href: "#" }, "2"],
                ["a.w3-button", { href: "#" }, "3"],
                ["a.w3-button", { href: "#" }, "4"],
                ["a.w3-button.w3-xlarge", { href: "#" }, "»"]
            ],
            ["br"],
            ["br"]
        ];
    }

}
