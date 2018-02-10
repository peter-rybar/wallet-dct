import { Widget } from "../prest/jsonml/jsonml-widget";
import { JsonMLs } from "../prest/jsonml/jsonml";

export interface AccSettings {
    name: string;
    privKey: string;
}

export class AccSettingsWidget extends Widget {

    private _title: string;
    private _account: AccSettings;

    private _onSave: (account: AccSettings) => void;

    constructor() {
        super("AccSettingsWidget");
        this._account = {
            name: "",
            privKey: ""
        };
    }

    getTitle(): string {
        return this._title;
    }

    setTitle(title: string): this {
        this._title = title;
        this.update();
        return this;
    }

    getAccount(): AccSettings {
        return this._account;
    }

    setAccount(account: AccSettings): this {
        this._account = account;
        this.update();
        return this;
    }

    onSave(onSave: (a: AccSettings) => void): this {
        this._onSave = onSave;
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
            ["form.w3-container", { submit: this._onSubmit },
                ["p",
                    ["label", "Name ",
                        ["input.w3-input~accName",
                            { type: "text", value: this._account.name }
                        ]
                    ], " "
                    // ["span.w3-text-red", this._errors.memo]
                ],
                ["p",
                    ["label", "Private key ",
                        ["input.w3-input~accPrivKey",
                            { type: "text", value: this._account.privKey }
                        ]
                    ], " "
                    // ["span.w3-text-red", this._errors.memo]
                ],
                ["p",
                    ["button.w3-btn.w3-blue", "Save"]
                ]
            ]
        ];
    }

    private _onSubmit = (e: Event) => {
        e.preventDefault();
        this._account.name = (this.refs["accName"] as HTMLInputElement).value;
        this._account.privKey = (this.refs["accPrivKey"] as HTMLInputElement).value;
        console.log("save", this._account);
        this._onSave && this._onSave(this._account);
    }

}
