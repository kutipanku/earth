import React from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

interface Props {
  onReady: (editor: ClassicEditor) => void;
  onChange: (_: unknown, editor: ClassicEditor) => void;
}

const toolbarItems = [
  'undo',
  'redo',
  '|',
  'heading',
  '|',
  'bold',
  'italic',
  '|',
  'link',
  '|',
  'bulletedList',
  'numberedList',
];

const CustomEditor = ({ onReady, onChange }: Props) => {
  return (
    <CKEditor
      editor={ClassicEditor}
      onReady={onReady}
      onChange={onChange}
      config={{ toolbar: toolbarItems }}
    />
  );
};

export default CustomEditor;
