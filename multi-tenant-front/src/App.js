import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Tenant1Theme from './Tenant1Theme';
import Tenant2Theme from './Tenant2Theme';
import DefaultTheme from './DefaultTheme';


function extractSubdomain() {
  const parts = window.location.hostname.split('.');
  if (parts.length === 3) {
    return parts[0]; // Subdomain exists
  }
  return null; // No subdomain (e.g., localhost)
}

function App() {
  const [themePage, setThemePage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [faviconUrl, setFaviconUrl] = useState('');

  useEffect(() => {
    const fetchThemePage = async () => {
      const subdomain = extractSubdomain();
      console.log(subdomain);
      if (subdomain) {
        try {
          const response = await fetch('https://localhost:7176/WeatherForecast/GetTheme', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ subdomain })
          });
          const data = await response.json();
          if (data.themePage) {
            setThemePage(data.themePage);
          } else {
            console.error('Error: No theme page found for subdomain');
          }
        } catch (error) {
          console.error('Error fetching theme page:', error);
        } finally {
          setLoading(false);
        }
      } else {
        console.error('Error: Subdomain not found');
        setLoading(false);
      }
    };

    const fetchFaviconImage = async () => {
      try {
        // Extract subdomain from window.location
        const subdomain = window.location.hostname.split('.')[0];
        const response = await fetch(`https://localhost:7176/WeatherForecast/GetFaviconImage?subdomain=${subdomain}`);
        const data = await response.json();
        setFaviconUrl(`https://localhost:7176/${data.bannerUrl}`);
        const faviconLink = document.querySelector("link[rel*='icon']");
        if (faviconLink) {
          faviconLink.href = `https://localhost:7176/${data.bannerUrl}`;
        }
      } catch (error) {
        console.error('Error fetching banner image:', error);
      }
    };

    fetchThemePage();
    fetchFaviconImage();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!themePage) {
    return <div>Error: No theme page found</div>;
  }

  const ThemeComponent = require(`./${themePage}`).default; // Dynamically import the theme component
  console.log(ThemeComponent);
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<ThemeComponent/>} />
      </Routes>
    </Router>
  );
}

export default App;
