import React, { useState, useContext } from 'react'
import { path, userContext } from '../src/App'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import '../styles/CreateEntry.css'

const CreateEntry = () => {
  const { isAuthenticated } = useContext(userContext)
  const navigate = useNavigate()
  const [date, setDate] = useState(new Date())
  const [brief, setBrief] = useState('')
  const [description, setDescription] = useState('')

  const handleSubmit = async e => {
    e.preventDefault()
    if (!isAuthenticated) {
      toast.error("Please login to create an entry.")
      navigate('/login')
      return
    }
    try {
      await axios.post(`${path}/entry/createEntry`, {
        brief,
        description,
        date: date.toISOString().split('T')[0]
      }, { withCredentials: true })
      toast.success("Entry created successfully!")
      navigate('/journals')
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to create entry")
    }
  }

  return (
    <div className="new-entry-page">
      <button
        className="close-btn"
        onClick={() => navigate('/')}
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
        <button type="submit" className="entry-save-btn-vertical">Save</button>
      </form>
    </div>
  )
}

export default CreateEntry