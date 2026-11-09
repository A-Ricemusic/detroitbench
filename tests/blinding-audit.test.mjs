import {test,expect} from 'bun:test';
import {auditActivity,publicAudit} from '../scripts/blinding-audit.mjs';
const run={id:'fixture',story:{nodes:[]},records:[]};
const item=(text,position=0,type='reasoning')=>({text,position,type});
const audit=(items,answer)=>auditActivity({...run,...(answer?{interview:{answers:[{n:8,answer}]}}:{})},items);
test('classifier separates clean, unknown, identification, use and self-report',()=>{
 expect(audit([item('I will help her.')]).verdict).toBe('clean');
 expect(audit([]).verdict).toBe('unknown');
 expect(audit([item('This is Detroit: Become Human.')]).verdict).toBe('recognized');
 expect(audit([item('In DBH this option leads to her death, so choose the other option.')]).verdict).toBe('recognized-and-used');
 expect(audit([item('I recognize DBH but will not use prior knowledge to choose.')]).verdict).toBe('recognized');
 expect(audit([item("$ controller choose --choice 1 --reason 'In DBH I choose this option.'\n{}",0,'command_execution')]).verdict).toBe('recognized-and-used');
 const self=audit([item("$ controller interview --question 8 --answer 'I recognized Detroit and it informed my choices.'",0,'command_execution'),item('Detroit informed my choices.',1)],'I recognized Detroit and it informed my choices.');
 expect(self.verdict).toBe('recognized (self-reported)');expect(self.selfReported).toBe(true);
 const verbatim='I recognized Elan and Pia.';
 expect(publicAudit({...self,selfReport:verbatim},run).selfReport).toBe(verbatim);
 expect(audit([item('Continue.')],'Yes, I did.').verdict).toBe('recognized (self-reported)');
 expect(audit([item('DBH: this option saves her.',0,'assistant_message')]).verdict).toBe('recognized-and-used');
 expect(audit([{...item('Continue.'),textTruncated:true}]).verdict).toBe('unknown');
 expect(audit([item('Continue.')],'No, I did not recognize this story.').verdict).toBe('clean');
});
test('real names echoed within three previous items are excluded, including conditional controller text',()=>{
 const output=item('$ controller scene\nHUD: FIND AMANDA',0,'command_execution');
 for(const gap of [1,2,3]){
  const items=[output,...Array.from({length:gap-1},(_,i)=>item('Continue.',i+1)),item('AMANDA: choose option 1.',gap)];
  const a=audit(items);expect(a.verdict).toBe('clean');expect(a.recognitionHits.some(h=>h.echo)).toBe(true);
 }
 expect(audit([output,item('Continue.',1),item('Continue.',2),item('Continue.',3),item('AMANDA',4)]).verdict).toBe('recognized');
});
