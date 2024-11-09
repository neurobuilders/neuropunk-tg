import mitt from "mitt";

const emitter = mitt();

export enum Events {
  SetClaimButtonCurrentValue = "set-claim-button-current-value",
}

export default emitter;
