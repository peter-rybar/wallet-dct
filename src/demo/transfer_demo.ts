import { TransferWidget } from "../main/widgets/transfer";

const app = new TransferWidget()
    .mount(document.getElementById("app"));

(self as any).app = app;
