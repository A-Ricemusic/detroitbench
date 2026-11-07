import {useSyncExternalStore} from 'react';
// The phone model panel, shared between the page that has it (ModelPicker on the results page) and the bottom tab bar,
// whose "Models" tab opens it. `available` is set while a page with the panel is mounted at phone width; `count` is
// the number of selected runs shown on the tab's badge.
let state={available:false,count:0,open:false};const listeners=new Set;
const emit=()=>{for(const l of listeners)l()};
export const modelsPanel={
 get:()=>state,
 set(patch){const next={...state,...patch};if(next.available===state.available&&next.count===state.count&&next.open===state.open)return;state=next;emit()},
 subscribe(l){listeners.add(l);return()=>listeners.delete(l)}};
export const useModelsPanel=()=>useSyncExternalStore(modelsPanel.subscribe,modelsPanel.get,modelsPanel.get);
// The tab's element id, so the panel can return focus to it when it closes.
export const MODELS_TAB_ID='models-tab';
