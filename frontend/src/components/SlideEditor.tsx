import Editor from 'react-simple-code-editor';
import Prism, { type Grammar } from 'prismjs';
import 'prismjs/components/prism-markdown';
import { markdownStore } from '../store/markdownStore';
import { useEffect, useRef, useState } from 'react';
import SlideRenderer from './SlideRender';
import Eye from '../assets/eye';
import EditPen from '../assets/EditPen';
import LayoutSelector from './LayoutSelector';

const SlideEditor = () => {
  const { slides, activeSlideId, updateSlideContent, setActiveSlide } = markdownStore();
  const activeSlide = slides.find((slide) => slide.id === activeSlideId) || {
    content: '',
    layout: 'default'
  };

  const debounceTimer = useRef<any>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [tempContent, setTempContent] = useState(activeSlide.content);

  const handleEyeClick = () => {
    setShowPreview(!showPreview);
  };

  useEffect(() => {
    if (!activeSlideId && slides.length > 0) {
      setActiveSlide(slides[0]?.id || '');
    }
    setTempContent('');
  }, [slides, activeSlideId, setActiveSlide, activeSlide]);

  const handleDebouncedUpdate = (id: string, content: string) => {
    if (debounceTimer.current) clearTimeout(debounceTimer.current);

    debounceTimer.current = setTimeout(() => {
      updateSlideContent(id, content);
    }, 300);
  };

  const handleChange = (content: string) => {
    setTempContent(content);
    handleDebouncedUpdate(activeSlideId, content);
  };

  const highlight = (code: string) => Prism.highlight(code, Prism.languages.markdown as Grammar, 'markdown');


  return (
    <div className="main-editor">
      <div className="editor-header">
        <div className="editor-controls">
          {showPreview ? (
            <button
              className="eye-preview"
              onClick={handleEyeClick}
              aria-label="Switch to edit mode"
            >
              <EditPen />
              Edit
            </button>
          ) : (
            <button
              className="eye-preview"
              onClick={handleEyeClick}
              aria-label="Switch to preview mode"
            >
              <Eye />
              Preview
            </button>
          )}
          <LayoutSelector />
        </div>
      </div>
      <div className="editor-content">
        {!showPreview ? (
          <Editor
            value={tempContent || activeSlide.content}
            onValueChange={handleChange}
            highlight={highlight}
            padding={16}
            style={{
              fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
              fontSize: 16,
              minHeight: 'calc(100vh - 200px)',
              background: '#f8fafc',
              color: '#1e293b',
            }}
          />
        ) : (
          <div className={`preview-pane layout-${activeSlide.layout}`}>
            <SlideRenderer />
          </div>
        )}
      </div>
    </div>
  );
};

export default SlideEditor;