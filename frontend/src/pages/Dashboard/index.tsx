import React, { useEffect } from 'react';
import SlideEditor from '../../components/SlideEditor';
import SlideRenderer from '../../components/SlideRender';
import SlideNavigator from '../../components/SlideNavigator';
import { markdownStore } from '../../store/markdownStore';

const Dashboard = () => {
  const { fetchSlides } = markdownStore();

  useEffect(() => {
    fetchSlides();
  }, []);

  return (
    <div className="dashboard-container">
      <SlideNavigator />
      <div className="dashboard-content">
        <div className="editor-container">
          <SlideEditor />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;