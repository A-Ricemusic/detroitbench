// Tampering helpers for branching-3.0 evidence. A record stores the state after its step only as stateAfterHash (and
// the changes that produced it); forging a different state means giving the record the hash of that state.
import {statesOf,hashSync} from '../../benchmark/story-engine.mjs';
// Sets records[i].stateAfterHash to the hash of the true state after record i, altered by `mutate`.
export function forgeState(run,i,mutate){const s=statesOf(run)[(i<0?run.records.length+i:i)+1];mutate(s);run.records.at(i).stateAfterHash=hashSync(s);return run}
