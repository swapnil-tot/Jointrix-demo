import React, { useEffect } from 'react';
import { markdownStore } from '../store/markdownStore';
import Layout from '../assets/icons/Layout';
import SplitLayout from '../assets/icons/SplitLayout';
import DefaultLayout from '../assets/icons/DefaultLayout';
import CenteredLayout from '../assets/icons/CenteredLayout';
import TwoColumnLayout from '../assets/icons/TwoColumnLayout';

const layouts = [
    {
        id: 'default',
        name: 'Default',
        icon: <DefaultLayout />,
    },
    {
        id: 'split',
        name: 'Split',
        icon: <SplitLayout />,
    },
    {
        id: 'centered',
        name: 'Centered',
        icon: <CenteredLayout />,
    },
    {
        id: 'two-column',
        name: 'Two Column',
        icon: <TwoColumnLayout />,
    },
];

const LayoutSelector = () => {
    const { activeSlideId, updateSlideLayout } = markdownStore();
    const [isOpen, setIsOpen] = React.useState(false);

    const handleLayoutChange = (layoutId: string) => {
        updateSlideLayout(activeSlideId, layoutId);
        setIsOpen(false);
    };

    useEffect(() => {
        const handleKeyDown = (event: any) => {
            if (
                event.target.tagName === 'INPUT' ||
                event.target.tagName === 'TEXTAREA' ||
                event.target.isContentEditable
            ) {
                return;
            }
            if (event.ctrlKey && event.key === 'l') {
                event.preventDefault();
                setIsOpen((prev: any) => !prev);
            }
            if (event.key === 'Escape') {
                event.preventDefault();
                setIsOpen(false);
            }
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, []);

    return (
        <div className="layout-selector" id="layout-selector">
            <button
                className="layout-button"
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Select layout"
            >
                <Layout />
                Layout
            </button>

            {isOpen && (
                <div className="layout-dropdown">
                    {layouts.map((layout) => (
                        <button
                            key={layout.id}
                            className="layout-option"
                            onClick={() => handleLayoutChange(layout.id)}
                        >
                            {layout.icon}
                            <span>{layout.name}</span>
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default LayoutSelector; 