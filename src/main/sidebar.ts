import { Widget } from "../main/prest/jsonml/jsonml-widget";
import { JsonMLs } from "../main/prest/jsonml/jsonml";

interface Menu {
    hash: string;
    label: string;
    icon: string;
}

export class SidebarWidget extends Widget {

    private _name = "";
    private _hash = "";
    private _menu: Menu[] = [
        { hash: "overview", label: "Overview", icon: "i.fa.fa-users.fa-fw" },
        { hash: "views", label: "Views", icon: "i.fa.fa-eye.fa-fw" },
        { hash: "news", label: "News", icon: "i.fa.fa-bell.fa-fw" },
        { hash: "settings", label: "Settings", icon: "i.fa.fa-cog.fa-fw" },
    ];
    private _nbsp = "\u00a0 ";

    constructor() {
        super("SidebarWidget");
    }

    setName(name: string): this {
        this._name = name;
        this.update();
        return this;
    }

    setHash(hash: string): this {
        this._hash = hash;
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
                        ["span",
                            ["a", { href: "#", style: "text-decoration: none;" }, "Welcome"],
                            this._name ? ", " : " ",
                            ["strong~name", this._name]
                        ],
                        ["br"],
                        ["a.w3-bar-item.w3-button", { href: "#messages", title: "Messages" },
                            ["i.fa.fa-envelope"]
                        ],
                        ["a.w3-bar-item.w3-button", { href: "#profile", title: "Profile" },
                            ["i.fa.fa-user"]
                        ],
                        ["a.w3-bar-item.w3-button", { href: "#settings", title: "Settings" },
                            ["i.fa.fa-cog"]
                        ],
                    ],
                ],
                ["hr"],
                ["div.w3-container",
                    ["h5", "Menu"],
                ],
                ["div.w3-bar-block",
                    ...this._menu.map(m => {
                        return (
                            ["a.w3-bar-item.w3-button.w3-padding",
                                {
                                    href: `#${m.hash}`,
                                    classes: m.hash === this._hash ? ["w3-blue"] : []
                                },
                                [m.icon], this._nbsp, m.label
                            ]);
                    }),
                    ["br"],
                    ["br"]
                ]
            ]
        ];
    }

}
