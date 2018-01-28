import { Widget } from "./prest/jsonml/jsonml-widget";
import { JsonMLs } from "./prest/jsonml/jsonml";

export class AppShell<SidebarW extends Widget, ContentW extends Widget> extends Widget {

    private _title: string;
    private _sidebar: SidebarW;
    private _content: ContentW;

    constructor() {
        super("AppShell");
    }

    setTitle(title: string): this {
        this._title = title;
        if (this.dom) {
            this.refs["title"].textContent = title;
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
                        click: this.onClickMenu
                    },
                    ["i.fa.fa-bars"],
                ],
                ["span.w3-bar-item",
                    ["strong~title", this._title]
                ],
                ["span.w3-bar-item.w3-right",
                    ["a",
                        {
                            href: "https://github.com/peter-rybar/wallet-dct",
                            title: "github",
                            target: "_blank"
                        },
                        ["i.fa.fa-github"]
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
            ]
        ];
    }

    sidebarOpen(): void {
        const sidebar = this.refs["sidebar"];
        const overlay = this.refs["overlay"];
        sidebar.style.display = "block";
        overlay.style.display = "block";
    }

    sidebarClose(): void {
        const sidebar = this.refs["sidebar"];
        const overlay = this.refs["overlay"];
        sidebar.style.display = "none";
        overlay.style.display = "none";
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
