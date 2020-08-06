import React from 'react';
import { CopyBlock, nord } from 'react-code-blocks';

const Code = ({ codeSnippet, language }) => {

  return <CopyBlock text={codeSnippet} language={language} theme={nord} />;
};

export default Code;

