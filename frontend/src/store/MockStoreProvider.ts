import { create } from 'zustand';
import { nanoid } from 'nanoid';

type Slide = {
  id: string;
  title: string;
  content: string;
  layout: string;
};

type markdownStoreType = {
  slides: Slide[];
  activeSlideId: string;
  fetchSlides: () => void;
  addSlide: () => void;
  setActiveSlide: (id: string) => void;
  updateSlideContent: (id: string, content: string) => void;
  updateSlideLayout: (id: string, layout: string) => void;
  getActiveSlide: () => Slide | undefined;
  isPending: boolean;
};

export const MockMarkdownStore = create<markdownStoreType>((set, get) => ({
  slides: [
    {
      id: nanoid(),
      title: 'Slide 1',
      content: '# Welcome to Slide 1\n\nStart editing here...',
      layout: 'default',
    },
  ],
  activeSlideId: '',
  fetchSlides: () => {
    const slides = get().slides;
    set({
      activeSlideId: slides[0]?.id || '',
      isPending: false,
    });
  },
  addSlide: () => {
    const { slides } = get();
    const newSlide = {
      id: nanoid(),
      title: `Slide ${slides.length + 1}`,
      content: `# Slide ${slides.length + 1}\nNew slide content`,
      layout: 'default',
    };
    set((state) => ({
      slides: [...state.slides, newSlide],
      activeSlideId: newSlide.id,
    }));
  },
  setActiveSlide: (id: string) => set({ activeSlideId: id }),
  updateSlideContent: (id: string, content: string) => {
    set((state) => ({
      slides: state.slides.map((slide) =>
        slide.id === id ? { ...slide, content } : slide
      ),
    }));
  },
  updateSlideLayout: (id: string, layout: string) => {
    set((state) => ({
      slides: state.slides.map((slide) =>
        slide.id === id ? { ...slide, layout } : slide
      ),
    }));
  },
  getActiveSlide: () => {
    const { slides, activeSlideId } = get();
    const idToUse = activeSlideId || (slides[0]?.id || '');
    return slides.find((slide) => slide.id === idToUse);
  },
  isPending: false,
}));
