import { type VisualizationSpec } from "react-vega";
import TTaskType from "./TTaskType";

export default interface IStateModel {
  spec: VisualizationSpec;
  task: TTaskType | null;
  data: Record<any, any>[];
}
