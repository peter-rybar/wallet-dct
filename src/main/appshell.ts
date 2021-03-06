import { Widget } from "./prest/jsonml/jsonml-widget";
import { JsonMLs } from "./prest/jsonml/jsonml";

export class AppShell<SidebarW extends Widget, ContentW extends Widget> extends Widget {

    private _title: string;
    private _title1: string;
    private _sidebar: SidebarW;
    private _content: ContentW;

    constructor() {
        super("AppShell");
    }

    getTitle(): string {
        return this._title;
    }

    setTitle(title: string): this {
        this._title = title;
        if (this.dom) {
            this.refs["title"].textContent = title;
        }
        return this;
    }

    getTitle1(): string {
        return this._title1;
    }

    setTitle1(title1: string): this {
        this._title1 = title1;
        if (this.dom) {
            this.refs["title1"].textContent = title1 ? ` - ${title1}` : "";
        }
        return this;
    }

    getSidebar(): SidebarW {
        return this._sidebar;
    }

    setSidebar(sidebar: SidebarW): this {
        this._sidebar = sidebar;
        sidebar && this.refs["sidebar"] && sidebar.mount(this.refs["sidebar"]);
        return this;
    }

    getContent(): ContentW {
        return this._content;
    }

    setContent(content: ContentW): this {
        this._content = content;
        content && this.refs["content"] && content.mount(this.refs["content"]);
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
            // header
            ["div.w3-bar.w3-top.w3-large.w3-blue",
                {
                    style: "z-index:4"
                },
                ["button.w3-bar-item.w3-button.w3-hide-large.w3-hover-none.w3-hover-text-light-grey",
                    {
                        accesskey: "m",
                        click: this.onClickMenu
                    },
                    ["i.fa.fa-bars"],
                ],
                ["span.w3-bar-item",
                    ["strong~title",
                        ["a", { href: "#", style: "text-decoration: none;" } , this._title]
                    ],
                    ["span~title1", this._title1 ? ` - ${this._title1}` : ""],
                ],
                ["span.w3-bar-item.w3-right",
                    ["a",
                        {
                            href: "https://github.com/peter-rybar/wallet-dct",
                            title: "Github",
                            target: "_blank"
                        },
                        ["i.fa.fa-github"]
                    ]
                ],
                ["span.w3-bar-item.w3-right", { style: "padding-right: 4px; padding-left: 4px;"},
                    ["a",
                        {
                            href: "http://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fpeter-rybar.github.io%2Fwallet-dct%2F&title=Wallet%20DCT&source=https%3A%2F%2Fpeter-rybar.github.io%2Fwallet-dct%2F",
                            title: "Share on LinkedIn",
                            target: "_blank"
                        },
                        ["i.fa.fa-linkedin"]
                    ]
                ],
                ["span.w3-bar-item.w3-right", { style: "padding-right: 4px; padding-left: 4px;"},
                    ["a",
                        {
                            href: "https://plus.google.com/share?url=https%3A%2F%2Fpeter-rybar.github.io%2Fwallet-dct%2F",
                            title: "Share on Google+",
                            target: "_blank"
                        },
                        ["i.fa.fa-google-plus"]
                    ]
                ],
                ["span.w3-bar-item.w3-right", { style: "padding-right: 4px; padding-left: 4px;"},
                    ["a",
                        {
                            href: "https://twitter.com/intent/tweet?source=https%3A%2F%2Fpeter-rybar.github.io%2Fwallet-dct%2F&text=Wallet%20DCT:%20https%3A%2F%2Fpeter-rybar.github.io%2Fwallet-dct%2F",
                            title: "Tweet",
                            target: "_blank"
                        },
                        ["i.fa.fa-twitter"]
                    ]
                ],
                ["span.w3-bar-item.w3-right", { style: "padding-right: 4px; padding-left: 4px;"},
                    ["a",
                        {
                            href: "https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fpeter-rybar.github.io%2Fwallet-dct%2F&quote=Wallet%20DCT",
                            title: "Share on Facebook",
                            target: "_blank"
                        },
                        ["i.fa.fa-facebook"]
                    ]
                ]
            ],
            // sidebar
            ["div.w3-sidebar.w3-collapse.w3-white.w3-animate-left~sidebar",
                {
                    _widget: this._sidebar,
                    style: "z-index:3;width:300px;"
                }
            ],
            // overlay
            ["div.w3-overlay.w3-hide-large.w3-animate-opacity~overlay",
                {
                    style: "cursor:pointer",
                    title: "close side menu",
                    click: this.onClickOwerlay
                }
            ],
            // main
            ["div.w3-main",
                {
                    style: "margin-left:300px;margin-top:43px;"
                },
                ["div.w3-container~content",
                    {
                        _widget: this._content
                    }
                ]
            ],
            // snackbar
            ["div#snackbar~snackbar", "test"]
        ];
    }

    snackbar(msg: string): void {
        const sb = this.refs["snackbar"];
        sb.textContent = msg;
        sb.classList.add("show");
        setTimeout(() => sb.classList.remove("show"), 3e3);
    }

    sidebarOpen(): void {
        this.refs["sidebar"].style.display = "block";
        this.refs["overlay"].style.display = "block";
    }

    sidebarClose(): void {
        this.refs["sidebar"].style.display = "none";
        this.refs["overlay"].style.display = "none";
    }

    sidebarToggle(): void {
        const sidebar = this.refs["sidebar"];
        const overlay = this.refs["overlay"];
        if (sidebar.style.display === "block") {
            sidebar.style.display = "none";
            overlay.style.display = "none";
        } else {
            sidebar.style.display = "block";
            overlay.style.display = "block";
        }
    }

    private onClickMenu = () => {
        this.sidebarToggle();
    }

    private onClickOwerlay = () => {
        this.sidebarClose();
    }

}
