// TenantPage.js
import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';

const TenantPage = ({ currentTenant }) => {
    console.log(currentTenant);
    useEffect(() => {
    if (currentTenant) {
      switch (currentTenant) {
        case 'blue':
            if (window.location.pathname !== '/tenant1-theme') {
                window.location.href = '/tenant1-theme';
              }
          break;
        case 'red':
            if (window.location.pathname !== '/tenant2-theme') {
                window.location.href = '/tenant2-theme';
              }
          break;
        default:
            if (window.location.pathname !== '/default-theme') {
                window.location.href = '/default-theme';
              }
      }
    }
  }, [currentTenant]);

  // This component will not render any content, as it redirects before rendering
  return null;
};

export default TenantPage;
