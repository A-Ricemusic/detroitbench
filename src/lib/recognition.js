export const RECOGNITION_MEANINGS={
 clean:'No visible participant-authored recognition was found; this does not prove the source was not internally recognized.',
 'recognized (self-reported)':'The participant reported recognizing the source in interview question 8; no in-play identification was established.',
 recognized:'The participant visibly identified the source; the audit did not establish use of that knowledge in a decision.',
 'recognized-and-used':'The participant visibly connected source knowledge to an option or anticipated outcome in participant-authored reasoning or an assistant message before the interview.',
 unknown:'The available activity is insufficient to determine visible recognition.',
 'not audited':'This run has no session activity audit.'
};
export const recognitionLabel=v=>v==='not audited'?'Not audited':v==='recognized-and-used'?'Recognized and used':v.charAt(0).toUpperCase()+v.slice(1);
