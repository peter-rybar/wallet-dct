
import { Widget } from "../prest/jsonml/jsonml-widget";
import { JsonMLs } from "../prest/jsonml/jsonml";

interface TransferData {
    amount: number;
    recipient: string;
    memo: string;
}

interface TransferErrors {
    amount: string;
    recipient: string;
    memo: string;
}

export class TransferWidget extends Widget {

    private _title: string = "Transfer";
    private _data: TransferData = { recipient: undefined, amount: undefined, memo: undefined };
    private _errors: TransferErrors = { amount: "", recipient: "", memo: "" };

    private _onSubmit: (data: TransferData) => void;

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

    getData(): TransferData {
        return this._data;
    }

    setData(data: TransferData): this {
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
                                input: this._onInputRecipient
                            }
                        ]
                    ], " ",
                    ["span.w3-text-red", this._errors.recipient]
                ],
                ["p",
                    ["label", "Amount ",
                        ["input.w3-input~amount",
                            {
                                type: "number", min: "0", max: "1000000",
                                input: this._onInputAmount
                            }
                        ]
                    ], " ",
                    ["span.w3-text-red", this._errors.amount]
                ],
                ["p",
                    ["label", "Memo ",
                        ["input.w3-input~memo",
                            {
                                type: "text",
                                input: this._onInputMemo
                            }
                        ]
                    ], " ",
                    ["span.w3-text-red", this._errors.memo]
                ],
                ["p",
                    ["button.w3-btn.w3-blue~submit", "Submit"]
                ]
            ]
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
            this._onSubmit && this._onSubmit(this._data);
        }
    }

    private _onInputAmount = (e: Event) => {
        const i = e.target as HTMLInputElement;
        // const i = this.refs["name"] as  HTMLInputElement;
        console.log("Amount", i.value);
        this._validateAmount(i.value);
        this.update();
    }

    private _onInputMemo = (e: Event) => {
        const i = e.target as HTMLInputElement;
        console.log("Memo", i.value);
        this._validateMemo(i.value);
        this.update();
    }

    private _onInputRecipient = (e: Event) => {
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
