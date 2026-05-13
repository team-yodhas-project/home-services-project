// components/Services.jsx
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../utils/axios';

const Services = () => {
  const [services, setServices] = useState([]);
  const [locationQuery, setLocationQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const scrollRef = useRef();
  const animationRef = useRef();

  const fetchServices = async (address) => {
    setLoading(true);
    setError('');

    try {
      const res = await API.get('/services', {
        params: {
          address: address || undefined,
        },
      });
      setServices(res.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to load services.');
      setServices([]);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchServices();
  }, []);

  useEffect(() => {
    const scroll = () => {
      if (!scrollRef.current) return;

      scrollRef.current.scrollLeft += 0.5;
      const maxScroll = scrollRef.current.scrollWidth / 2;

      if (scrollRef.current.scrollLeft >= maxScroll) {
        scrollRef.current.scrollLeft = 0;
      }

      animationRef.current = requestAnimationFrame(scroll);
    };

    animationRef.current = requestAnimationFrame(scroll);

    return () => cancelAnimationFrame(animationRef.current);
  }, [services]);

  const handleSearch = (event) => {
    event.preventDefault();
    fetchServices(locationQuery.trim());
  };

  return (
    <section className="services-section">
      <div className="container">
        <div className="services-header">
          <h2 style={{ marginBottom: '20px' }}>Find Local Services</h2>
          <form className="service-search" onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search by location (city, address, ZIP)"
              value={locationQuery}
              onChange={(e) => setLocationQuery(e.target.value)}
            />
            <button type="submit" className="btn">
              Search
            </button>
          </form>
          {error && <p className="error-message">{error}</p>}
        </div>

        {loading ? (
          <p>Loading services...</p>
        ) : services.length === 0 ? (
          <p>No services found. Try a different location or check back later.</p>
        ) : (
          <div className="services-grid">
            {services.map((service) => (
              <div
                key={service._id}
                className="service-card"
                onClick={() => navigate(`/services/${service._id}`)}
              >
                {service.image ? (
                  <img src={service.image} alt={service.title} />
                ) : (
                  <div className="service-card-placeholder">No image</div>
                )}
                <div className="service-card-body">
                  <h4>{service.title}</h4>
                  <p>{service.category}</p>
                  <p>{service.description}</p>
                  <p>Price: ${service.price}</p>
                  <p>Provider: {service.providerId?.name || 'Unknown'}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Services;