import React from 'react';
import { headerStyles, combineClasses } from '@/lib/styles/component-styles';

interface HeaderProps {
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ className }) => {
  return (
    <header className={combineClasses(headerStyles.container, className)}>
      <div className={headerStyles.content}>
        <div className={headerStyles.logo}>
          <h1 className={headerStyles.title}>
            Gena Dashboards Test App
          </h1>
        </div>
        
        <nav className={headerStyles.navigation}>
          <a href="/" className={headerStyles.navLink}>
            Dashboards
          </a>
          <a href="/api-docs" className={headerStyles.navLink}>
            API Docs
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;