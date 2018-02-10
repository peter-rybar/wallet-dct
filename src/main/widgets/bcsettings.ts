import { Widget } from "../prest/jsonml/jsonml-widget";
import { JsonMLs } from "../prest/jsonml/jsonml";

export interface BcSettings {
    chainId: string;
    chainAddr: string;
}

export class BcSettingsWidget extends Widget {

    private _title: string;
    private _settings: BcSettings;

    private _onSave: (settings: BcSettings) => void;

    constructor() {
        super("BcSettingsWidget");
        this._settings = {
            chainId: "",
            chainAddr: "",
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

    getSettings(): BcSettings {
        return this._settings;
    }

    setSettings(settings: BcSettings): this {
        this._settings = settings;
        this.update();
        return this;
    }

    onSave(onSave: (settings: BcSettings) => void): this {
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
                    ["label", "Blockchain Id ",
                        ["input.w3-input~bcId",
                            { type: "text", value: this._settings.chainId }
                        ]
                    ], " "
                    // ["span.w3-text-red", this._errors.recipient]
                ],
                ["p",
                    ["label", "Blockchain Address ",
                        ["input.w3-input~bcAddr",
                            { type: "text", value: this._settings.chainAddr }
                        ]
                    ], " "
                    // ["span.w3-text-red", this._errors.amount]
                ],
                ["p",
                    ["button.w3-btn.w3-blue", "Save"]
                ]
            ]
        ];
    }

    private _onSubmit = (e: Event) => {
        e.preventDefault();
        this._settings.chainId = (this.refs["bcId"] as HTMLInputElement).value;
        this._settings.chainAddr = (this.refs["bcAddr"] as HTMLInputElement).value;
        console.log("save", this._settings);
        this._onSave && this._onSave(this._settings);
    }

}
