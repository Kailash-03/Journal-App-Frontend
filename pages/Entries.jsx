import React, { useEffect, useState, useContext } from 'react'
import { path, userContext } from '../src/main'
import axios from 'axios'
import '../styles/Entries.css'

const Entries = () => {
  const { isAuthenticated } = useContext(userContext)
  const [refresh, SetRefresh] = useState(false)
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

  return (
    <div>
      {EntryList.length === 0 ? (
        <div>No journal entries found for this user.</div>
      ) : (
        <div>
          <h2>Your Journal Entries</h2>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {EntryList.map((entry, idx) => (
              <li key={idx} style={{ marginBottom: "1.5rem", padding: "1rem", border: "1px solid #eee", borderRadius: "8px" }}>
                <div><strong>Date:</strong> {entry.date}</div>
                <div><strong>Brief:</strong> {entry.brief}</div>
                <div><strong>Description:</strong> {entry.description}</div>
                <div><strong>Score:</strong> {entry.score}</div>
                <div><strong>Sentiment Score:</strong> {entry.sentimentScore}</div>
                <div><strong>Mood:</strong> {entry.mood}</div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default Entries