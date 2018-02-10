import { Widget } from "../main/prest/jsonml/jsonml-widget";
import { JsonMLs } from "../main/prest/jsonml/jsonml";

interface Menu {
    hash: string;
    label: string;
    icon: string;
}

interface User {
    name: string;
    avatar: string;
}

export class SidebarWidget extends Widget {

    private _hash = "";
    private _user: User;
    private _account: Menu[] = [
        // { hash: "account", label: "Account", icon: "i.fa.fa-users.fa-fw" },
        { hash: "history", label: "History", icon: "i.fa.fa-history.fa-fw" },
        { hash: "transfer", label: "Transfer", icon: "i.fa.fa-exchange.fa-fw" }
    ];
    private _settings: Menu[] = [
        { hash: "settings-acc", label: "Account", icon: "i.fa.fa-cog.fa-fw" },
        { hash: "settings-bc", label: "Blockchain", icon: "i.fa.fa-cogs.fa-fw" }
    ];
    // private _info: Menu[] = [
    //     { hash: "news", label: "News", icon: "i.fa.fa-bell.fa-fw" }
    // ];
    private _nbsp = "\u00a0 ";

    constructor() {
        super("SidebarWidget");
    }

    setUser(user: User): this {
        this._user = user;
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
                // ["br"],
                // ["div.w3-container.w3-row",
                //     ["div.w3-col.s4",
                //         ["img.w3-circle.w3-margin-right",
                //             {
                //                 src:  this._user.avatar || "https://www.w3schools.com/w3images/avatar2.png",
                //                 style: "width:46px"
                //             }
                //         ]
                //     ],
                //     ["div.w3-col.s8.w3-bar",
                //         ["span",
                //             ["a", { href: "#", style: "text-decoration: none;" }, "Welcome"],
                //             this._user.name ? ", " : " ",
                //             ["strong~name", this._user.name]
                //         ],
                //         ["br"],
                //         ["a.w3-bar-item.w3-button", { href: "#messages", title: "Messages" },
                //             ["i.fa.fa-envelope"]
                //         ],
                //         ["a.w3-bar-item.w3-button", { href: "#profile", title: "Profile" },
                //             ["i.fa.fa-user"]
                //         ],
                //         ["a.w3-bar-item.w3-button", { href: "#settings", title: "Settings" },
                //             ["i.fa.fa-cog"]
                //         ],
                //     ],
                // ],
                // ["hr"],
                ["div.w3-container",
                    ["h5", "Account"],
                ],
                ["div.w3-bar-block",
                    ...this._account.map(m => {
                        return (
                            ["a.w3-bar-item.w3-button.w3-padding",
                                {
                                    href: `#${m.hash}`,
                                    classes: m.hash === this._hash ? ["w3-blue"] : []
                                },
                                [m.icon], this._nbsp, m.label
                            ]);
                    }),
                ],
                ["hr"],
                ["div.w3-container",
                    ["h5", "Settings"],
                ],
                ["div.w3-bar-block",
                    ...this._settings.map(m => {
                        return (
                            ["a.w3-bar-item.w3-button.w3-padding",
                                {
                                    href: `#${m.hash}`,
                                    classes: m.hash === this._hash ? ["w3-blue"] : []
                                },
                                [m.icon], this._nbsp, m.label
                            ]);
                    }),
                ],
                // ["hr"],
                // ["div.w3-container",
                //     ["h5", "Info"],
                // ],
                // ["div.w3-bar-block",
                //     ...this._info.map(m => {
                //         return (
                //             ["a.w3-bar-item.w3-button.w3-padding",
                //                 {
                //                     href: `#${m.hash}`,
                //                     classes: m.hash === this._hash ? ["w3-blue"] : []
                //                 },
                //                 [m.icon], this._nbsp, m.label
                //             ]);
                //     }),
                // ],
                ["br"],
                ["br"]
            ]
        ];
    }

}
