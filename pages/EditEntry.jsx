import React, { useContext, useEffect, useState } from 'react'
import { path,userContext } from '../src/main'
import { useNavigate, useParams} from 'react-router-dom'
import toast from 'react-hot-toast'
import axios from 'axios'
import Calendar from 'react-calendar'

const EditEntry = () => {
  const [entry, setEntry] = useState({});
  const { id } = useParams();

  const [date, setDate] = useState(new Date());
  const [brief, setBrief] = useState('');
  const [description, setDescription] = useState('');
  const [score, setScore] = useState(0);
  // const { isAuthenticated } = useContext(userContext);
  const navigate = useNavigate();

  // Add a loading state
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${path}/entry/${id}`, {
      withCredentials: true
    })
      .then(response => setEntry(response?.data?.entry || {}))
      .catch(error => {
        console.error("Error fetching entries:", error)
        setEntry({})
      })
      .finally(() => setLoading(false));
  }, [id]);

  // Update state variables when entry is fetched
  useEffect(() => {
    if (entry && entry._id) {
      setDate(entry.date ? new Date(entry.date) : new Date());
      setBrief(entry.brief || '');
      setDescription(entry.description || '');
      setScore(entry.score || 0);
    }
  }, [entry]);

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.put(`${path}/entry/${id}`, {
        brief,
        description,
        date: date.toISOString().split('T')[0],
        score
      }, { withCredentials: true });
      toast.success("Entry updated successfully!");
      navigate('/journals');
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update entry");
    }
  };

  if (loading) {
    return <div style={{textAlign: "center", marginTop: "3rem"}}>Loading...</div>;
  }

  if (!entry._id) {
    return <div style={{textAlign: "center", marginTop: "3rem"}}>Entry not found.</div>;
  }

  return (
    <div className="new-entry-page">
      <button
        className="close-btn"
        onClick={() => navigate('/journals')}
        aria-label="Close"
        type="button"
      >
        &#10005;
      </button>
      <form className="new-entry-form-vertical" onSubmit={handleSubmit}>
        <div className="calendar-wrapper-vertical">
          <Calendar
            onChange={setDate}
            value={date}
          />
        </div>
        <input
          className="entry-brief-input"
          type="text"
          placeholder="Title"
          value={brief}
          onChange={e => setBrief(e.target.value)}
          required
        />
        <textarea
          className="entry-textarea"
          placeholder="Start writing..."
          value={description}
          onChange={e => setDescription(e.target.value)}
          required
        />
        <input
          className="entry-brief-input"
          type="number"
          placeholder="How was your day? (0-10)"
          value={score}
          onChange={e => setScore(e.target.value)}
          min={0}
          max={10}
        />
        <button type="submit" className="entry-save-btn-vertical">Save</button>
      </form>
    </div>
  );
};

export default EditEntry