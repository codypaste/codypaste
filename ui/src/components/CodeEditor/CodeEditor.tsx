import React, { useState, useRef, useEffect } from "react";
import CodeMirror from "codemirror";
import styled from "styled-components";
import { topbarStyles } from "config/styles";
import "codemirror/lib/codemirror.css";
import "components/CodeEditor/CodeEditor.scss";

const CodeEditorContainer = styled.div`
  padding: 0.5rem;
  height: calc(100vh - ${topbarStyles.height});
`;

interface CodeEditorProps {
  content: string;
  id: string;
  onSave: (id: string, content: string) => void;
}

const CodeEditor = ({ content, id, onSave }: CodeEditorProps) => {
  const [codeMirrorInstance, setCodeMirrorInstance] = useState<
    CodeMirror.EditorFromTextArea
  >();
  const textAreaRef: any = useRef();

  // Initialize Codemirror if not initialized
  useEffect(() => {
    if (!codeMirrorInstance) {
      const cm = CodeMirror.fromTextArea(textAreaRef.current, {
        lineNumbers: true,
        lineWrapping: true,
      });
      setCodeMirrorInstance(cm);
    }
  }, [codeMirrorInstance, id]);

  // Update its value
  useEffect(() => {
    if (codeMirrorInstance && content !== codeMirrorInstance.getValue()) {
      codeMirrorInstance.setValue(content);
    }
  }, [content, codeMirrorInstance, id]);

  // Register and unregister event to save the value
  useEffect(() => {
    const handleSave = () => {
      if (!codeMirrorInstance) {
        return;
      }

      onSave(id, codeMirrorInstance.getValue());
    };

    if (!codeMirrorInstance) {
      return;
    }

    codeMirrorInstance.on("blur", handleSave);

    return () => {
      codeMirrorInstance.off("blur", handleSave);
    };
  }, [id, onSave, codeMirrorInstance]);

  return (
    <CodeEditorContainer>
      <textarea ref={textAreaRef}></textarea>
    </CodeEditorContainer>
  );
};

export default CodeEditor;
