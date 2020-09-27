import React, { useState, useRef, useEffect } from "react";
import CodeMirror from "codemirror";
import styled from "styled-components";
import "codemirror/lib/codemirror.css";
import "components/CodeEditor/CodeEditor.scss";

const CodeEditorContainer = styled.div`
  padding: 0.5rem;
  height: 100%;
`;

export const CodeEditor = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [codeMirrorInstance, setCodeMirrorInstance] = useState<any>();
  const textAreaRef: any = useRef();

  useEffect(() => {
    const codemirror = CodeMirror.fromTextArea(textAreaRef.current, {
      lineNumbers: true,
    });
    setCodeMirrorInstance(codemirror);
  }, []);

  return (
    <CodeEditorContainer>
      <textarea ref={textAreaRef}></textarea>
    </CodeEditorContainer>
  );
};
