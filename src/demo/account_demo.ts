import { AccountWidget } from "../main/widgets/account";

const app = new AccountWidget()
    .setTitle("Account")
    .mount(document.getElementById("app"));
(self as any).app = app;
