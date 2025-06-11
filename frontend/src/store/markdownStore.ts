import { create } from 'zustand';
import { nanoid } from 'nanoid'
import axiosInstance from '../utils/axiosInstance';

type Slide = {
    id: string,
    title: string,
    content: string,
    layout: string
}

type markdownStoreType = {
    slides: Slide[]
    activeSlideId: string
    fetchSlides: () => void
    addSlide: () => void
    setActiveSlide: (id: string) => void
    updateSlideContent: (id: string, content: string) => void
    updateSlideLayout: (id: string, layout: string) => void
    getActiveSlide: () => Slide | undefined
    isPending: boolean
}

export const markdownStore = create<markdownStoreType>((set, get) => ({
    slides: [{ id: nanoid(), title: 'Slide 1', content: '# Welcome to Slide 1\n\nStart editing here...', layout: 'default' }],
    activeSlideId: '',
    fetchSlides: async () => {
        try {
            set({ isPending: true })
            const response = await axiosInstance.get('/slides') //fetch('http://localhost:3001/api/slides');
            const data = response.data
            if (response && data.success && response.status === 200) {
                const slides = data.data

                set({
                    slides,
                    activeSlideId: slides[0]?.id || null,
                });
                set({ isPending: false })
            }
            else {
                set({ isPending: false })
                console.error('got error in getSlides ', response.data.error || response.data.message)
            }
        } catch (error) {
            set({ isPending: false })
            console.error('Failed to fetch slides:', error);
        }
    },
    addSlide: async () => {
        const { slides, activeSlideId } = get();
        const newSlide = {
            activeSlideId,
            title: `Slide ${slides.length + 1}`,
            content: `# Slide ${slides.length + 1}\nNew slide content`,
            layout: 'default',
        };
        try {
            const response = await axiosInstance.post('/addSlide', newSlide) //fetch('http://localhost:3001/api/slides)
            let data = response.data
            if (data.success && response.status === 200) {
                const createdSlide = data.data;
                set((state) => ({
                    slides: [...state.slides.filter((s) => s.id !== createdSlide.id), createdSlide].sort(
                        (a, b) => a.order - b.order
                    ),
                    activeSlideId: createdSlide.id,
                }));
            }

        } catch (error) {
            console.error('Failed to add slide:', error);
        }
    },
    setActiveSlide: (id: string) => set({ activeSlideId: id }),
    updateSlideContent: async (id: string, content: string) => {
        try {
            const response = await axiosInstance.put(`/slide/${id}`, { content })
            let data = response?.data
            if ( response.status === 200) {
                const updatedSlide = data;
                set((state) => ({
                    slides: state.slides.map((slide) =>
                        slide.id === id ? { ...slide, content: updatedSlide.content } : slide
                    ),
                }));
            }
            else {
                console.error('got error in update content : ')
            }
        } catch (error) {
            console.error('Failed to update slide:', error);
        }
    },
    updateSlideLayout: async (id: string, layout: string) => {
        try {
            const response = await axiosInstance.put(`/slide/${id}/layout`, { layout })
            if (response.status === 200) {
                set((state) => ({
                    slides: state.slides.map((slide) =>
                        slide.id === id ? { ...slide, layout } : slide
                    ),
                }));
            }
        } catch (error) {
            console.error('Failed to update slide layout:', error);
        }
    },
    getActiveSlide: () => {
        const { slides, activeSlideId } = get();
        let activeSlide = activeSlideId
        // On first mount, if no active slide, set the first one
        if (!activeSlideId && slides.length > 0) {
            activeSlide = slides[0]?.id || ''
        }
        return slides.find((slide: { id: any; }) => slide.id === activeSlide)
    },
    isPending: false
}))



