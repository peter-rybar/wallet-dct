import { AddAccountWidget } from "../main/widgets/add-account";

const app = new AddAccountWidget()
    .setTitle("MyApp")
    .mount(document.getElementById("app"));
(self as any).app = app;
