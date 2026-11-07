// Preserve node:test's options-first signature while using Bun's native scheduler.
// Bun 1.3.14's node:test shim can register a following file inside an unfinished test.
import {test as nativeTest} from 'bun:test';
export default function test(name, options, fn) {
 return fn ? nativeTest(name, fn, options.timeout) : nativeTest(name, options);
}
