// Tenant2Theme.js
import React, { useState, useEffect } from 'react';

const Tenant2Theme = () => {
    const [bannerUrl, setBannerUrl] = useState('');

    useEffect(() => {
        // Fetch the banner image URL based on the subdomain from the API
        const fetchBannerUrl = async () => {
            try {
                // Extract subdomain from window.location
                const subdomain = window.location.hostname.split('.')[0];
                const response = await fetch(`https://localhost:7176/WeatherForecast/GetImage?subdomain=${subdomain}`);
                const data = await response.json();
                setBannerUrl(`https://localhost:7176/${data.bannerUrl}`);
            } catch (error) {
                console.error('Error fetching banner image:', error);
            }
        };

        fetchBannerUrl();
    }, []);

    const [headerImage, setHeaderImage] = useState(null);
    const [faviconImage, setFaviconImage] = useState(null);

    // Handle header image upload
    const handleHeaderImageUpload = (event) => {
        const file = event.target.files[0];
        setHeaderImage(file);
    };

    // Handle favicon image upload
    const handleFaviconImageUpload = (event) => {
        const file = event.target.files[0];
        setFaviconImage(file);
    };

    // Function to send uploaded images to server
    const saveImages = () => {
        const formData = new FormData();
        formData.append('headerImage', headerImage);
        formData.append('faviconImage', faviconImage);
        const subdomain = window.location.hostname.split('.')[0];

        // Make a POST request to your server endpoint with formData and subdomain information
        fetch(`https://localhost:7176/WeatherForecast/UploadImages?subdomain=${subdomain}`, {
            method: 'POST',
            body: formData,
            // Add headers if needed, like authorization token
        })
            .then(response => response.json())
            .then(data => {
                console.log('Images uploaded successfully:', data);
                window.location.reload();
                // Handle success response
            })
            .catch(error => {
                console.error('Error uploading images:', error);
                // Handle error
            });
    };

    useEffect(() => {
        document.getElementById('headerImageUpload').addEventListener('change', function (event) {
            const fileName = event.target.files[0].name;
            document.getElementById('headerFileName').textContent = fileName;
        });

        document.getElementById('faviconImageUpload').addEventListener('change', function (event) {
            const fileName = event.target.files[0].name;
            document.getElementById('faviconFileName').textContent = fileName;
        });

        
    }, []); // Empty dependency array ensures this effect runs only once after component mount


    return (
        <div>
            {/* Header with Image Banner */}
            <header style={{ backgroundColor: '#2196F3', color: 'white', textAlign: 'center' }}>
                <div className="container">
                    {bannerUrl && <img src={bannerUrl} alt="Banner" style={{ maxWidth: '100%', height: '50%' }} />}
                </div>
            </header>

            {/* Hero Section */}
            <section style={{ backgroundColor: '#E3F2FD', padding: '50px 0', textAlign: 'center' }}>
                <div className="container">
                    <h2>Hero Section</h2>
                    <p>This is the hero section of Tenant 1 Theme.</p>
                </div>
            </section>

            {/* Features Section */}
            <section style={{ backgroundColor: '#f9f9f9', padding: '50px 0', textAlign: 'center' }}>
                <div className="container">
                    <h2 style={{ marginBottom: '30px' }}>Features</h2>
                    <div className="features">
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <div style={{ marginBottom: '20px' }}>
                                <label htmlFor="headerImageUpload" style={{ margin: '20px', fontWeight: 'bold', fontSize: '18px' }}>Upload Header Image</label>
                                <input type="file" id="headerImageUpload" onChange={handleHeaderImageUpload} style={{ display: 'none' }} />
                                <label htmlFor="headerImageUpload" style={{ cursor: 'pointer', backgroundColor: '#4CAF50', color: 'white', padding: '10px 20px', borderRadius: '5px' }}>Choose File</label>
                                <span id="headerFileName" style={{ marginLeft: '10px', fontSize: '16px', color: '#666' }}></span>
                            </div>
                            <div style={{ marginBottom: '20px' }}>
                                <label htmlFor="faviconImageUpload" style={{ margin: '20px', fontWeight: 'bold', fontSize: '18px' }}>Upload Favicon Image</label>
                                <input type="file" id="faviconImageUpload" onChange={handleFaviconImageUpload} style={{ display: 'none' }} />
                                <label htmlFor="faviconImageUpload" style={{ cursor: 'pointer', backgroundColor: '#4CAF50', color: 'white', padding: '10px 20px', borderRadius: '5px' }}>Choose File</label>
                                <span id="faviconFileName" style={{ marginLeft: '10px', fontSize: '16px', color: '#666' }}></span>
                            </div>
                            <button onClick={saveImages} style={{ backgroundColor: '#4CAF50', color: 'white', padding: '10px 20px', fontSize: '18px', borderRadius: '5px', cursor: 'pointer', border: 'none', boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)', transition: 'background-color 0.3s ease' }}>Save Images</button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Call to Action Section */}
            <section style={{ backgroundColor: '#2196F3', color: 'white', padding: '50px 0', textAlign: 'center' }}>
                <div className="container">
                    <h2>Ready to get started?</h2>
                    <button style={{ padding: '10px 20px', fontSize: '16px', backgroundColor: 'white', color: '#2196F3', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Sign Up</button>
                </div>
            </section>
        </div>
    );
};

export default Tenant2Theme;
