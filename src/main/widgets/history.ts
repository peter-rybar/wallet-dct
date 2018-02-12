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
            ["ul.w3-ul w3-card-4.w3-white.w3-hoverable",
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
            ["ul.w3-ul.w3-hoverable.w3-white",
                ["li", "Jill", ["span.w3-right", ["span.w3-large", "2.53"], ["span.w3-small", " DCT"]]],
                ["li", "Eve", ["span.w3-right", ["span.w3-large", "2.53"], ["span.w3-small", " DCT"]]],
                ["li", "Adam", ["span.w3-right", ["span.w3-large", "2.53"], ["span.w3-small", " DCT"]]]
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
            ["table.w3-table-all.w3-margin-top",
                ["tr",
                    ["th", { style: "width:60%;" }, "Desc"],
                    ["th", { style: "width:40%;" }, "Amount"]
                ],
                ["tr",
                    ["td", { style: "width:60%;" }, "Alfreds Futterkiste"],
                    ["td", { style: "width:40%;" }, ["span.w3-large", "2.53"], ["span.w3-small", " DCT"]]
                ],
                ["tr",
                    ["td", { style: "width:60%;" }, "Alfreds Futterkiste"],
                    ["td", { style: "width:40%;" }, ["span.w3-large", "2.53"], ["span.w3-small", " DCT"]]
                ],
                ["tr",
                    ["td", { style: "width:60%;" }, "Alfreds Futterkiste"],
                    ["td", { style: "width:40%;" }, ["span.w3-large", "2.53"], ["span.w3-small", " DCT"]]
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
