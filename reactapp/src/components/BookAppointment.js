import React, { useState, useEffect } from 'react';
import { doctorAPI, appointmentAPI } from '../utils/api';
import { useNavigate } from 'react-router-dom';

const BookAppointment = () => {
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [specializationFilter, setSpecializationFilter] = useState('');
  const [appointmentData, setAppointmentData] = useState({
    appointmentDate: '',
    appointmentTime: '',
    reason: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchDoctors();
  }, []);

  useEffect(() => {
    filterDoctors();
  }, [doctors, searchTerm, specializationFilter]);

  const fetchDoctors = async () => {
    try {
      const response = await doctorAPI.getAll();
      setDoctors(response.data);
      setFilteredDoctors(response.data);
    } catch (error) {
      console.error('Error fetching doctors:', error);
    }
  };

  const filterDoctors = () => {
    let filtered = doctors;

    if (searchTerm) {
      filtered = filtered.filter(doctor =>
        doctor.user.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (specializationFilter) {
      filtered = filtered.filter(doctor =>
        doctor.specialization.toLowerCase().includes(specializationFilter.toLowerCase())
      );
    }

    setFilteredDoctors(filtered);
  };

  const handleDoctorSelect = (doctor) => {
    setSelectedDoctor(doctor);
  };

  const handleInputChange = (e) => {
    setAppointmentData({
      ...appointmentData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const getDayName = (date) => {
    const days = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'];
    return days[new Date(date).getDay()];
  };

  const isTimeInRange = (time, availability) => {
    if (!availability) return false;
    
    const timeSlots = availability.split(',');
    const appointmentTime = time.replace(':', '');
    
    return timeSlots.some(slot => {
      const [start, end] = slot.split('-');
      const startTime = start.replace(':', '');
      const endTime = end.replace(':', '');
      return appointmentTime >= startTime && appointmentTime <= endTime;
    });
  };

  const getAvailabilityForDay = (doctor, date) => {
    if (!doctor.dailyAvailability || !date) return null;
    const dayName = getDayName(date);
    return doctor.dailyAvailability[dayName] || null;
  };

  const formatAvailability = (availability) => {
    if (!availability) return 'Not available';
    return availability.replace(',', ', ');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    // Validate availability
    const dayAvailability = getAvailabilityForDay(selectedDoctor, appointmentData.appointmentDate);
    
    if (!dayAvailability) {
      setError('Doctor is not available on the selected date. Please choose another date.');
      return;
    }
    
    if (!isTimeInRange(appointmentData.appointmentTime, dayAvailability)) {
      setError(`Please book within doctor's available time: ${formatAvailability(dayAvailability)}`);
      return;
    }
    
    setLoading(true);

    try {
      const bookingData = {
        doctorId: selectedDoctor.id,
        ...appointmentData
      };
      
      await appointmentAPI.book(bookingData);
      alert('Appointment request submitted successfully!');
      navigate('/patient/dashboard');
    } catch (error) {
      setError('Error booking appointment. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getSpecializations = () => {
    const specializations = [...new Set(doctors.map(d => d.specialization))];
    return specializations;
  };

  return (
    <div className="book-appointment-container">
      <div className="header">
        <h1>Book Appointment</h1>
        <button onClick={() => navigate('/patient/dashboard')} className="back-btn">
          Back to Dashboard
        </button>
      </div>

      {!selectedDoctor ? (
        <div className="doctor-search">
          <h2>Search Doctors</h2>
          
          <div className="search-filters">
            <input
              type="text"
              placeholder="Search by doctor name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            
            <select
              value={specializationFilter}
              onChange={(e) => setSpecializationFilter(e.target.value)}
              className="filter-select"
            >
              <option value="">All Specializations</option>
              {getSpecializations().map(spec => (
                <option key={spec} value={spec}>{spec}</option>
              ))}
            </select>
          </div>

          <div className="doctors-list">
            {filteredDoctors.map(doctor => (
              <div key={doctor.id} className="doctor-card">
                <h3>Dr. {doctor.user.name}</h3>
                <p><strong>Specialization:</strong> {doctor.specialization}</p>
                <p><strong>Qualifications:</strong> {doctor.qualifications}</p>
                {doctor.clinicName && (
                  <p><strong>Clinic:</strong> {doctor.clinicName}</p>
                )}
                <div className="availability-info">
                  <p><strong>Availability:</strong></p>
                  {doctor.dailyAvailability ? (
                    <div className="availability-schedule">
                      {Object.entries(doctor.dailyAvailability).map(([day, time]) => (
                        time && (
                          <div key={day} className="availability-day">
                            <span className="day-name">{day.charAt(0) + day.slice(1).toLowerCase()}:</span>
                            <span className="time-slot">{formatAvailability(time)}</span>
                          </div>
                        )
                      ))}
                    </div>
                  ) : (
                    <p className="no-availability">Availability not set</p>
                  )}
                </div>
                <button 
                  onClick={() => handleDoctorSelect(doctor)}
                  className="select-doctor-btn"
                >
                  Select Doctor
                </button>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="appointment-form">
          <h2>Book Appointment with Dr. {selectedDoctor.user.name}</h2>
          
          <div className="selected-doctor-info">
            <p><strong>Specialization:</strong> {selectedDoctor.specialization}</p>
            <p><strong>Qualifications:</strong> {selectedDoctor.qualifications}</p>
            
            <div className="doctor-availability">
              <h4>Doctor's Availability:</h4>
              {selectedDoctor.dailyAvailability ? (
                <div className="availability-schedule">
                  {Object.entries(selectedDoctor.dailyAvailability).map(([day, time]) => (
                    time && (
                      <div key={day} className="availability-day">
                        <span className="day-name">{day.charAt(0) + day.slice(1).toLowerCase()}:</span>
                        <span className="time-slot">{formatAvailability(time)}</span>
                      </div>
                    )
                  ))}
                </div>
              ) : (
                <p className="no-availability">Availability not set</p>
              )}
            </div>
            
            {appointmentData.appointmentDate && (
              <div className="selected-day-availability">
                <h4>Available on {appointmentData.appointmentDate}:</h4>
                <p className="time-range">
                  {formatAvailability(getAvailabilityForDay(selectedDoctor, appointmentData.appointmentDate)) || 'Not available on this day'}
                </p>
              </div>
            )}
          </div>

          {error && <div className="error-message">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Appointment Date:</label>
              <input
                type="date"
                name="appointmentDate"
                value={appointmentData.appointmentDate}
                onChange={handleInputChange}
                min={new Date().toISOString().split('T')[0]}
                required
              />
            </div>

            <div className="form-group">
              <label>Appointment Time:</label>
              <input
                type="time"
                name="appointmentTime"
                value={appointmentData.appointmentTime}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Reason for Visit:</label>
              <textarea
                name="reason"
                value={appointmentData.reason}
                onChange={handleInputChange}
                placeholder="Describe your symptoms or reason for visit..."
                rows="4"
              />
            </div>

            <div className="form-actions">
              <button 
                type="button" 
                onClick={() => setSelectedDoctor(null)}
                className="secondary-btn"
              >
                Change Doctor
              </button>
              <button type="submit" disabled={loading} className="primary-btn">
                {loading ? 'Booking...' : 'Book Appointment'}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default BookAppointment;