
import { Widget } from "../prest/jsonml/jsonml-widget";
import { JsonMLs } from "../prest/jsonml/jsonml";
import { Signal } from "../prest/signal";

interface FormData {
    amount: number;
    recipient: string;
    memo: string;
}

interface FormErrors {
    amount: string;
    recipient: string;
    memo: string;
}


export class TransferWidget extends Widget {

    private _title: string = "Form";
    private _data: FormData = { recipient: undefined, amount: undefined, memo: undefined };
    private _errors: FormErrors = { amount: "", recipient: "", memo: "" };

    readonly sigData = new Signal<FormData>();

    constructor() {
        super("TransferWidget");
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
                    ["label", "Recipient ",
                        ["input.w3-input~recipient",
                            {
                                type: "text",
                                input: this._onRecipientInput
                            }
                        ]
                    ], " ",
                    ["em.error", this._errors.recipient]
                ],
                ["p",
                    ["label", "Amount ",
                        ["input.w3-input~amount",
                            {
                                type: "number", min: "0", max: "1000000",
                                input: this._onAmountInput
                            }
                        ]
                    ], " ",
                    ["em.error", this._errors.amount]
                ],
                ["p",
                    ["label", "Memo ",
                        ["input.w3-input~memo",
                            {
                                type: "text",
                                input: this._onMemoInput
                            }
                        ]
                    ], " ",
                    ["em.error", this._errors.memo]
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
        this._validateRecipient((this.refs["recipient"] as HTMLInputElement).value);
        this._validateAmount((this.refs["amount"] as HTMLInputElement).value);
        this._validateMemo((this.refs["memo"] as HTMLInputElement).value);
        if (this._errors.amount || this._errors.recipient || this._errors.memo) {
            this.update();
        } else {
            this.sigData.emit(this._data);
            this.refs["data"].innerText = JSON.stringify(this._data, null, 4);
        }
    }

    private _onAmountInput = (e: Event) => {
        const i = e.target as HTMLInputElement;
        // const i = this.refs["name"] as  HTMLInputElement;
        console.log("Amount", i.value);
        this._validateAmount(i.value);
        this.update();
    }

    private _onMemoInput = (e: Event) => {
        const i = e.target as HTMLInputElement;
        console.log("Memo", i.value);
        this._validateMemo(i.value);
        this.update();
    }

    private _onRecipientInput = (e: Event) => {
        const i = e.target as HTMLInputElement;
        console.log("Recipient", i.value);
        this._validateRecipient(i.value);
        this.update();
    }

    private _validateRecipient(recipient: string) {
        if (recipient) {
            this._data.recipient = recipient;
            this._errors.recipient = "";
        } else {
            this._data.recipient = undefined;
            this._errors.recipient = "Recipient required";
        }
    }

    private _validateMemo(memo: string) {
        if (memo) {
            this._data.memo = memo;
            this._errors.memo = "";
        } else {
            this._data.memo = undefined;
            this._errors.memo = "Memo required";
        }
    }

    private _validateAmount(amount: string) {
        if (amount) {
            if (isNaN(+amount)) {
                this._data.amount = undefined;
                this._errors.amount = "Invalid amount number";
            } else {
                this._data.amount = +amount;
                this._errors.amount = "";
            }
        } else {
            this._data.amount = undefined;
            this._errors.amount = "Amount required";
        }
    }

}
