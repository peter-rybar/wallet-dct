import { PaymentsWidget } from "../main/widgets/payments";

const app = new PaymentsWidget()
    .setTitle("MyApp")
    .mount(document.getElementById("app"));

(self as any).app = app;
