import React, { useRef, useState, useCallback } from "react";
import {
  Editor,
  EditorState,
  RichUtils,
  getDefaultKeyBinding,
} from "draft-js";
import "draft-js/dist/Draft.css";
import "./RichEditor.css";

const RichTextEditor = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const editorRef = useRef(null);

  const focus = () => editorRef.current && editorRef.current.focus();

  const onChange = (newState) => {
    setEditorState(newState);
    const plainText = newState.getCurrentContent().getPlainText();
    console.log("Updated Text:", plainText);
  };

  const handleKeyCommand = useCallback((command, editorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      onChange(newState);
      return "handled";
    }
    return "not-handled";
  }, []);

  const mapKeyToEditorCommand = (e) => {
    if (e.keyCode === 9) {
      const newEditorState = RichUtils.onTab(e, editorState, 4);
      if (newEditorState !== editorState) onChange(newEditorState);
      return null;
    }
    return getDefaultKeyBinding(e);
  };

  const toggleBlockType = (blockType) =>
    onChange(RichUtils.toggleBlockType(editorState, blockType));

  const toggleInlineStyle = (inlineStyle) =>
    onChange(RichUtils.toggleInlineStyle(editorState, inlineStyle));

  const logPlainText = () => {
    const plainText = editorState.getCurrentContent().getPlainText();
    console.log("Text:", plainText);
  };

  let className = "RichEditor-editor";
  const contentState = editorState.getCurrentContent();
  if (!contentState.hasText() &&
      contentState.getBlockMap().first().getType() !== "unstyled") {
    className += " RichEditor-hidePlaceholder";
  }

  return (
    <div className="RichEditor-root">
      <div className="RichEditor-controls-container">
        <BlockStyleControls
          editorState={editorState}
          onToggle={toggleBlockType}
        />
        <InlineStyleControls
          editorState={editorState}
          onToggle={toggleInlineStyle}
        />
      </div>
      <div className={className} onClick={focus}>
        <Editor
          blockStyleFn={getBlockStyle}
          customStyleMap={styleMap}
          editorState={editorState}
          handleKeyCommand={handleKeyCommand}
          keyBindingFn={mapKeyToEditorCommand}
          onChange={onChange}
          placeholder="Tell a story..."
          ref={editorRef}
          spellCheck={true}
        />
      </div>
    </div>
  );
};

// Custom styles
const styleMap = {
  CODE: {
    backgroundColor: "rgba(0, 0, 0, 0.05)",
    fontFamily: "'Inconsolata', 'Menlo', 'Consolas', monospace",
    fontSize: 16,
    padding: 2,
  },
};

const getBlockStyle = (block) => {
  if (block.getType() === "blockquote") return "RichEditor-blockquote";
  return null;
};

const StyleButton = ({ onToggle, style, label, active }) => {
  const handleMouseDown = (e) => {
    e.preventDefault();
    onToggle(style);
  };

  const className = `RichEditor-styleButton ${
    active ? "RichEditor-activeButton" : ""
  }`;

  return (
    <button className={className} onMouseDown={handleMouseDown}>
      {label}
    </button>
  );
};

const BLOCK_TYPES = [
  { label: "H1", style: "header-one" },
  { label: "H2", style: "header-two" },
  { label: "H3", style: "header-three" },
  { label: "Blockquote", style: "blockquote" },
  { label: "UL", style: "unordered-list-item" },
  { label: "OL", style: "ordered-list-item" },
  { label: "Code Block", style: "code-block" },
];

const BlockStyleControls = ({ editorState, onToggle }) => {
  const selection = editorState.getSelection();
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();

  return (
    <div className="RichEditor-controls">
      {BLOCK_TYPES.map((type) => (
        <StyleButton
          key={type.label}
          active={type.style === blockType}
          label={type.label}
          onToggle={onToggle}
          style={type.style}
        />
      ))}
    </div>
  );
};

const INLINE_STYLES = [
  { label: "Bold", style: "BOLD" },
  { label: "Italic", style: "ITALIC" },
  { label: "Underline", style: "UNDERLINE" },
  { label: "Code", style: "CODE" },
];

const InlineStyleControls = ({ editorState, onToggle }) => {
  const currentStyle = editorState.getCurrentInlineStyle();

  return (
    <div className="RichEditor-controls">
      {INLINE_STYLES.map((type) => (
        <StyleButton
          key={type.label}
          active={currentStyle.has(type.style)}
          label={type.label}
          onToggle={onToggle}
          style={type.style}
        />
      ))}
    </div>
  );
};

export default RichTextEditor;
