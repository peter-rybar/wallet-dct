import { HistoryWidget } from "../main/widgets/history";

const app = new HistoryWidget()
    .setTitle("History")
    .mount(document.getElementById("app"));

(self as any).app = app;
