import { DireflowComponent } from "direflow-component";
import App from "./App";

export default DireflowComponent.create({
  component: App,
  configuration: {
    tagname: "edit-modal",
  },
  plugins: [
    {
      name: "font-loader",
      options: {
        google: {
          families: ["Muli", "Noto Sans JP"],
        },
      },
    },
  ],
});
