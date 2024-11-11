
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs'; // or any other style you prefer
import js_lang from 'react-syntax-highlighter/dist/esm/languages/hljs/javascript';
import python_lang from 'react-syntax-highlighter/dist/esm/languages/hljs/python';
import c_lang from 'react-syntax-highlighter/dist/esm/languages/hljs/c';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';


SyntaxHighlighter.registerLanguage('javascript', js_lang);
SyntaxHighlighter.registerLanguage('python', python_lang);
SyntaxHighlighter.registerLanguage('c', c_lang);

export default function CodeElement({ element, style }) {
  console.log(element)
  return (
    <div
      style={{ width: "100%", height: "100%", objectFit: "cover", ...style }}
    >
      <SyntaxHighlighter
        language="auto"
        style={docco}
        showLineNumbers={true} 
      >
        {element.code}
      </SyntaxHighlighter>
    </div>
  )
}