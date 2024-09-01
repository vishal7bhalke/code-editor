import { useEffect, useRef, useState } from 'react';
import Codemirror from 'codemirror';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/theme/dracula.css';
import 'codemirror/lib/codemirror.css';
import 'codemirror/addon/edit/closetag';
import 'codemirror/addon/edit/closebrackets'; // Correct import path for autoCloseBrackets
import './codemirror.css';
export default function Editorbox({ socketRef, roomid,oncodechange }) {
   
    const editorRef = useRef(null);
    const [editorInitialized, setEditorInitialized] = useState(false);

    useEffect(() => {
        const init = () => {
            editorRef.current = Codemirror.fromTextArea(document.getElementById('realeditor'), {
                mode: { name: 'javascript', json: true },
                theme: 'dracula',
                autoCloseTags: true,
                autoCloseBrackets: true,
                lineNumbers: true,
            });

            editorRef.current.on('change', (instance, changes) => {
                const { origin } = changes;
                const code = instance.getValue();
                oncodechange(code);
                if (origin !== 'setValue') {
                    socketRef.current.emit('code_change', {
                        roomid,
                        code,
                    });
                }
            });

            setEditorInitialized(true);
        };

        init();

        return () => {
            if (editorRef.current) {
                editorRef.current.toTextArea();
                editorRef.current = null;
            }
        };
    }, [socketRef, roomid]);

    useEffect(() => {
        if (socketRef.current && editorInitialized) {
            const handleCodeChange = ({ code }) => {
                if (code !== null && editorRef.current.getValue() !== code) {
                    editorRef.current.setValue(code);
                }
            };

            socketRef.current.on('code_change', handleCodeChange);

            return () => {
                socketRef.current.off('code_change', handleCodeChange);
            };
        }
    }, [socketRef, editorInitialized]);

    return (
        <textarea  name="editor" id="realeditor"></textarea>
    );
}
