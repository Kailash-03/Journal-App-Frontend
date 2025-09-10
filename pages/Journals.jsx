import React, { useEffect, useState, useContext } from 'react'
import { path, userContext } from '../src/main'
import axios from 'axios'
import '../styles/Journals.css'
import { Link } from 'react-router-dom';
import LineChart from './ChartComp';

const placeholderImages = [
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=400&q=80",
  // "https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80"
];

const Journals = () => {
  const { isAuthenticated } = useContext(userContext)
  const [refresh, SetRefresh] = useState(false)
  const [EntryList, setEntryList] = useState([])
  const [loading, setLoading] = useState(true); 
  const [dateOption, setDateOption] = useState('weekly');
  const [graphLabels, setGraphLabels] = useState([]);
  const [graphData, setGraphData] = useState([]);

  useEffect(() => {
    setLoading(true); // <-- Add this line
    axios.get(`${path}/entry/getAllMyEntries`, {
      withCredentials: true
    })
      .then(response => setEntryList(response?.data?.data || []))
      .catch(error => {
        console.error("Error fetching entries:", error)
        setEntryList([])
      })
      .finally(() => setLoading(false));
  }, [isAuthenticated, refresh])

  useEffect(() => {
    const endDate = new Date(Date.now());
    let StartDate = new Date(Date.now());

    if (dateOption === 'weekly') {
      StartDate.setDate(endDate.getDate() - 7);
    } else if (dateOption === 'monthly') {
      StartDate.setMonth(endDate.getMonth() - 1);
    } else if (dateOption === 'yearly') {
      StartDate.setFullYear(endDate.getFullYear() - 1);
    }

    const formattedStartDate = StartDate.toISOString().split('T')[0];
    const formattedEndDate = endDate.toISOString().split('T')[0];

    const labels = [];
    const data = [];
    axios.get(`${path}/entry/getEntriesByDateRange`, {
      params: {
        startDate: formattedStartDate,
        endDate: formattedEndDate
      },
      withCredentials: true
    })
      .then(response => {
        console.log("=== DEBUG: API CALL SUCCESS ===");
        console.log("Full API Response:", response);
        console.log("Response data:", response.data);
        console.log("Response data.data:", response.data.data);
        console.log("typeof response.data.data:", typeof response.data.data);
        
        // Force it to be an array no matter what
        let entries = [];
        if (response.data && response.data.data && Array.isArray(response.data.data)) {
          entries = response.data.data;
        } else {
          console.error("API response structure is not as expected:", response.data);
          entries = [];
        }
        
        console.log("Final entries array:", entries);
        console.log("entries.length:", entries.length);
        
        // Clear previous data
        labels.length = 0;
        data.length = 0;
        
        entries.forEach(entry => {
          labels.push(entry.date);
          data.push(entry.sentimentScore);
        });

        console.log("Graph Data:", { labels, data });
        setGraphLabels([...labels]);
        setGraphData([...data]);
      })
      .catch(error => {
        console.error("Error fetching date range entries:", error);
        setGraphLabels([]);
        setGraphData([]);
      });
      
      
  }, [dateOption]);


  const HandleEdit = (date) => () => {
    axios.post(`${path}/entry/getMySpecificEntry`, { date }, {
      withCredentials: true
    })
      .then(response => {
        if (response.data.status) {
          const entry = response.data.entry;
          // Assuming you have a function to handle the edit logic
          console.log("Edit Entry:", entry);
          // You can redirect to an edit page or open a modal here
        } else {
          alert(response.data.message);
        }
      })
      .catch(error => {
        console.error("Error fetching specific entry:", error);
        alert("Failed to fetch entry for editing.");
      });
  }

  const handleDelete = (id) => () => {
    if (!window.confirm("Are you sure you want to delete this entry?")) return;
    setLoading(true);
    axios.delete(`${path}/entry/${id}`, {
      withCredentials: true
    })
      .then(response => {
        if (response.data.status) {
          setEntryList(prev => prev.filter(entry => entry._id !== id));
        } else {
          alert(response.data.message || "Failed to delete entry.");
        }
      })
      .catch(error => {
        console.error("Error deleting entry:", error);
        alert("Failed to delete entry.");
      })
      .finally(() => setLoading(false));
  };

    if (loading) {
    return <div style={{textAlign: "center", marginTop: "3rem"}}>Loading...</div>;
  }



return (
  !isAuthenticated?
  <>
  <div className="journals-page">
    <h1 className="journals-title">My Journal</h1>
    <div className="no-journals-msg">Please log in to view your journal entries.</div>
  </div>
  </> :
  <>
  <div className="journals-page">
  <div className='graph-container'>
    <h2> select date:</h2>
    <select value = {dateOption} onChange={(e)=>{setDateOption(e.target.value)
    }}>
      <option value="weekly">Weekly</option>
      <option value="monthly">Monthly</option>
      <option value="yearly">Yearly</option>
    </select>

    {graphLabels.length > 0 && (
      <LineChart
        labels={graphLabels}
        dataPoints={graphData}
        title="Your Sentiment Over Time"
      />
    )}
  </div>
    <h1 className="journals-title">My Journal</h1>
    <div className="journals-list">
      {EntryList.length === 0 ? (
        <div className="no-journals-msg">No journal entries found.</div>
      ) : (
        EntryList.map((entry, idx) => (

          <div className="journal-card" key={entry._id}>
            <div className="journal-img-wrap" style={{ position: "relative" }}>
              <img
                src={placeholderImages[idx % placeholderImages.length]}
                alt="journal visual"
                className="journal-img"
              />
              <div className="journal-action-icons">
                <Link to={`/edit/${entry._id}`} className="icon-btn" title="Edit">
                  {/* Pencil SVG */}
                  <svg width="22" height="22" fill="none" stroke="#3887fe" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                    <path d="M12 20h9" />
                    <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19.5 3 21l1.5-4L16.5 3.5z" />
                  </svg>
                </Link>
                <button onClick={handleDelete(entry._id)} className="icon-btn" title="Delete">
                  {/* Bin SVG */}
                  <svg width="22" height="22" fill="none" stroke="#d32f2f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                    <polyline points="3 6 5 6 21 6" />
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" />
                    <line x1="10" y1="11" x2="10" y2="17" />
                    <line x1="14" y1="11" x2="14" y2="17" />
                  </svg>
                </button>
              </div>
            </div>
            <div><strong>Date:</strong> {entry.date}</div>
            <div><strong>Brief:</strong> {entry.brief}</div>
            <div><strong>Description:</strong> {entry.description}</div>
            <div><strong>Score:</strong> {entry.score}</div>
            <div><strong>Sentiment Score:</strong> {entry.sentimentScore}</div>
            <div><strong>Mood:</strong> {entry.mood}</div>
          </div>

        ))
      )}
    </div>
  </div>
  </>
)

}

export default Journals