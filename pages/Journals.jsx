import React, { useEffect, useState, useContext } from 'react'
import { path, userContext } from '../src/App'
import axios from 'axios'
import '../styles/Journals.css'
import { Link } from 'react-router-dom';

const placeholderImages = [
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=400&q=80",
  // "https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80"
];

const Journals = () => {
  const { isAuthenticated } = useContext(userContext)
  const [refresh, setRefresh] = useState(false)
  const [EntryList, setEntryList] = useState([])

  useEffect(() => {
    axios.get(`${path}/entry/getAllMyEntries`, {
      withCredentials: true
    })
      .then(response => setEntryList(response?.data?.data || []))
      .catch(error => {
        console.error("Error fetching entries:", error)
        setEntryList([])
      })
  }, [isAuthenticated, refresh])


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
return (
  <div className="journals-page">
    <h1 className="journals-title">My Journal</h1>
    <div className="journals-list">
      {EntryList.length === 0 ? (
        <div className="no-journals-msg">No journal entries found.</div>
      ) : (
        EntryList.map((entry, idx) => (

          <div className="journal-card" key={entry._id}>
            <div className="journal-img-wrap">
              <img
                src={placeholderImages[idx % placeholderImages.length]}
                alt="journal visual"
                className="journal-img"
              />
            </div>
              <div><strong>Date:</strong> {entry.date}</div>
              <div><strong>Brief:</strong> {entry.brief}</div>
              <div><strong>Description:</strong> {entry.description}</div>
              <div><strong>Score:</strong> {entry.score}</div>
              <div><strong>Sentiment Score:</strong> {entry.sentimentScore}</div>
              <div><strong>Mood:</strong> {entry.mood}</div>
              <Link to={`/edit/${entry._id}`} className='journal buttons'>Edit</Link>
          </div>

        ))
      )}
    </div>
  </div>
)
}

export default Journals