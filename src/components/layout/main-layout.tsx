import React from 'react';
import { layoutStyles, layoutSidebarStyles, mainContentStyles, combineClasses } from '@/lib/styles/component-styles';
import Header from '@/components/ui/header';

interface MainLayoutProps {
  children: React.ReactNode;
  showHeader?: boolean;
  showSidebar?: boolean;
}

const MainLayout: React.FC<MainLayoutProps> = ({ 
  children, 
  showHeader = true,
  showSidebar = false 
}) => {
  return (
    <div className={layoutStyles.page}>
      {showHeader && (
        <Header className={layoutStyles.header} />
      )}
      
      <div className="flex justify-center w-full">
        {showSidebar && (
          <aside className={combineClasses(layoutStyles.sidebar, 'hidden lg:block')}>
            <div className={layoutSidebarStyles.container}>
              <nav className={layoutSidebarStyles.navigation}>
                <a href="/" className={layoutSidebarStyles.navLink}>
                  Dashboards
                </a>
                <a href="/api-docs" className={layoutSidebarStyles.navLink}>
                  API Documentation
                </a>
              </nav>
            </div>
          </aside>
        )}
        
        <main className={combineClasses(layoutStyles.content, 'flex-1')}>
          <div className={mainContentStyles.container}>
            <div className={mainContentStyles.content}>
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default MainLayout; 