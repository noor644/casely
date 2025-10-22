import React, { useState } from 'react'

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    alert('Thank you for your message! We will get back to you soon.')
    setFormData({ name: '', email: '', message: '' })
  }

  return (
    <section className="contact-page">
      <h2 className="contact-title">Contact Us</h2>
      <p className="contact-subtitle">Have a question? We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>
      
      <form className="contact-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name" className="form-label">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="form-input"
            placeholder="Your name"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="form-input"
            placeholder="your.email@example.com"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="message" className="form-label">Message</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            className="form-textarea"
            placeholder="Write your message here..."
            rows="6"
            required
          />
        </div>

        <button type="submit" className="form-submit">
          Send Message
        </button>
      </form>
    </section>
  )
}

