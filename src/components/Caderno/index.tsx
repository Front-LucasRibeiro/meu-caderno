import { useEffect, useState } from 'react';

// lib de editor 
import { Editor } from "react-draft-wysiwyg";
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { EditorState, convertFromRaw, convertToRaw } from 'draft-js';

import { useParams } from 'react-router-dom';
import { Caderno as ICaderno } from '../Shared/ICaderno';
import s from './styles.module.scss';

const Caderno = () => {
  const { id } = useParams();
  const [nomeCaderno, setNomeCaderno] = useState<string>("");
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty());
  const [content, setContent] = useState<string>("");

  const convertContentToEditorState = (content: string) => {
    try {
      const contentState = convertFromRaw(JSON.parse(content));
      return EditorState.createWithContent(contentState);
    } catch (error) {
      console.error('Erro ao converter conteúdo para o formato do editor:', error);
      return EditorState.createEmpty();
    }
  };

  const getListaCadernos = () => {
    fetch("http://localhost:3001/cadernos")
      .then(resp => resp.json())
      .then((data: ICaderno[]) => {
        const cadernoProcurado = data.find(caderno => caderno.nome.toLowerCase() === id);
        if (cadernoProcurado) {
          const editorState = convertContentToEditorState(cadernoProcurado.conteudo);
          setEditorState(editorState);
          setContent(cadernoProcurado.conteudo);
          setNomeCaderno(cadernoProcurado.nome);
        }
      });
  };

  const handleEditorChange = (state: EditorState) => {
    setEditorState(state);
    const contentState = state.getCurrentContent();
    const rawContentState = convertToRaw(contentState);
    const contentString = JSON.stringify(rawContentState);
    setContent(contentString);
    salvaConteudo(contentString);
  };

  const salvaConteudo = async (valorConteudo: string) => {
    const data = {
      conteudo: valorConteudo
    }

    const config = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }

    try {
      const response = await fetch('http://localhost:3001/cadernos/1', config)
      const result = await response.json();
      console.log("sucesso:", result);
    } catch (error) {
      console.error("erro:", error);
    }
  }

  useEffect(() => {
    getListaCadernos();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (editorState.getCurrentContent().hasText() && !content) {
      const contentState = convertFromRaw(JSON.parse(content));
      const newEditorState = EditorState.createWithContent(contentState);
      setEditorState(newEditorState);
    }
  }, [editorState, content]);

  return (
    <section className='p-4 flex flex-col items-center'>
      <h2 className='font-bold mb-5'>{nomeCaderno}</h2>
      <div className={`${s.conteudoWrap} flex justify-center flex-col items-center`}>
        <Editor
          editorState={editorState}
          onEditorStateChange={handleEditorChange}
          wrapperClassName="wrapper-class"
          editorClassName="editor-class"
          toolbarClassName="toolbar-class"
        />
        
      </div>
    </section>
  )
}

export default Caderno;
