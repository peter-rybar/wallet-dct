import { Widget } from "../main/prest/jsonml/jsonml-widget";
import { JsonMLs } from "../main/prest/jsonml/jsonml";


export class SidebarWidget extends Widget {

    constructor() {
        super("HelloWidget");
    }

    onMount() {
        console.log("onMount", this.type, this.id);
    }

    onUmount() {
        console.log("onUmount", this.type, this.id);
    }

    render(): JsonMLs {
        const nbsp = "\u00a0 ";
        return [
            ["nav",
                ["br"],
                ["div.w3-container.w3-row",
                    ["div.w3-col.s4",
                        ["img.w3-circle.w3-margin-right",
                            {
                                src: "https://www.w3schools.com/w3images/avatar2.png",
                                style: "width:46px"
                            }
                        ]
                    ],
                    ["div.w3-col.s8.w3-bar",
                        ["span", "Welcome, ", ["strong", "Mike"]],
                        ["br"],
                        ["a.w3-bar-item.w3-button", { "href": "#" }, ["i.fa.fa-envelope"]],
                        ["a.w3-bar-item.w3-button", { "href": "#" }, ["i.fa.fa-user"]],
                        ["a.w3-bar-item.w3-button", { "href": "#" }, ["i.fa.fa-cog"]],
                    ],
                ],
                ["hr"],
                ["div.w3-container",
                    ["h5", "Menu"],
                ],
                ["div.w3-bar-block",
                    ["a.w3-bar-item.w3-button.w3-padding", { href: "#" },
                        ["i.fa.fa-users.fa-fw"], nbsp, "Overview"
                    ],
                    ["a.w3-bar-item.w3-button.w3-padding", { href: "#views", classes: ["w3-blue"] },
                        ["i.fa.fa-eye.fa-fw"], nbsp, "Views"
                    ],
                    ["a.w3-bar-item.w3-button.w3-padding", { href: "#traffic" },
                        ["i.fa.fa-users.fa-fw"], nbsp, "Traffic"
                    ],
                    ["a.w3-bar-item.w3-button.w3-padding", { href: "#geo" },
                        ["i.fa.fa-bullseye.fa-fw"], nbsp, "Geo"
                    ],
                    ["a.w3-bar-item.w3-button.w3-padding", { href: "#orders" },
                        ["i.fa.fa-diamond.fa-fw"], nbsp, "Orders"
                    ],
                    ["a.w3-bar-item.w3-button.w3-padding", { href: "#news" },
                        ["i.fa.fa-bell.fa-fw"], nbsp, "News"
                    ],
                    ["a.w3-bar-item.w3-button.w3-padding", { href: "#general" },
                        ["i.fa.fa-bank.fa-fw"], nbsp, "General"
                    ],
                    ["a.w3-bar-item.w3-button.w3-padding", { href: "#history" },
                        ["i.fa.fa-history.fa-fw"], nbsp, "History"
                    ],
                    ["a.w3-bar-item.w3-button.w3-padding", { href: "#settings"},
                        ["i.fa.fa-cog.fa-fw"], nbsp, "Settings"
                    ],
                    ["br"],
                    ["br"]
                ]
            ]
        ];
    }

}
