
import { Widget } from "../prest/jsonml/jsonml-widget";
import { JsonMLs } from "../prest/jsonml/jsonml";
import { Signal } from "../prest/signal";

interface FormData {
    account: string;
    privateKey: string;
}

interface FormErrors {
    account: string;
    privateKey: string;
}


export class AddAccountWidget extends Widget {

    private _title: string = "Form";
    private _data: FormData = { account: undefined, privateKey: undefined };
    private _errors: FormErrors = { account: "", privateKey: "" };

    readonly sigData = new Signal<FormData>();

    constructor() {
        super("AddAccountWidget");
    }

    getTitle(): string {
        return this._title;
    }

    setTitle(title: string): this {
        this._title = title;
        this.update();
        return this;
    }

    getData(): FormData {
        return this._data;
    }

    setData(data: FormData): this {
        this._data = data;
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
            ["form.w3-container", { submit: this._onFormSubmit },
                ["p",
                    ["label", "Account ",
                        ["input.w3-input~account",
                            {
                                type: "text",
                                input: this._onAccountInput
                            }
                        ]
                    ], " ",
                    ["em.error", this._errors.account]
                ],
                ["p",
                    ["label", "Private Key ",
                        ["input.w3-input~privatekey",
                            {
                                type: "text",
                                input: this._onPrivateKeyInput
                            }
                        ]
                    ], " ",
                    ["em.error", this._errors.privateKey]
                ],
                ["p",
                    ["button.w3-btn.w3-blue~submit", "Submit"]
                ]
            ],
            ["pre~data"]
        ];
    }

    private _onFormSubmit = (e: Event) => {
        e.preventDefault();
        console.log("submit", this._data);
        this._validateAccount((this.refs["account"] as HTMLInputElement).value);
        // console.log(this.refs["privatekey"]["value"]);
        this._validatePrivateKey((this.refs["privatekey"] as HTMLInputElement).value);
        if (this._errors.privateKey || this._errors.account) {
            this.update();
        } else {
            this.sigData.emit(this._data);
            this.refs["data"].innerText = JSON.stringify(this._data, null, 4);
        }
    }

    private _onPrivateKeyInput = (e: Event) => {
        const i = e.target as HTMLInputElement;
        console.log("PrivateKey", i.value);
        this._validatePrivateKey(i.value);
        this.update();
    }

    private _onAccountInput = (e: Event) => {
        const i = e.target as HTMLInputElement;
        console.log("Account", i.value);
        this._validateAccount(i.value);
        this.update();
    }

    private _validateAccount(account: string) {
        if (account) {
            this._data.account = account;
            this._errors.account = "";
        } else {
            this._data.account = undefined;
            this._errors.account = "Account required";
        }
    }

    private _validatePrivateKey(privateKey: string) {
        if (privateKey) {
            this._data.privateKey = privateKey;
            this._errors.privateKey = "";
        } else {
            this._data.privateKey = undefined;
            this._errors.privateKey = "PrivateKey required";
        }
    }

}
