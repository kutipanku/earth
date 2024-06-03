import React from 'react';
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

interface Props {
  onReady: (editor: ClassicEditor) => void;
  onChange: (_: unknown ,editor: ClassicEditor) => void;
}

const CustomEditor = ({ onReady, onChange }: Props) => {
  return (
    <CKEditor editor={ClassicEditor} onReady={onReady} onChange={onChange} />
  )
}

export default CustomEditor;