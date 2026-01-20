import { useNavigate } from 'react-router-dom'
import './Landing.css'
import todoListImage from '../assets/todoListImage.jpg'

function Landing() {
  const navigate = useNavigate()

  return (
    <div className="landing-container">
      <nav className="navbar">
        <div className="navbar-brand">
          <h1>TodoList App</h1>
        </div>
        <div className="navbar-buttons">
          <button className="btn btn-secondary" onClick={() => navigate('/login')}>
            Login
          </button>
          <button className="btn btn-primary" onClick={() => navigate('/register')}>
            Sign Up
          </button>
        </div>
      </nav>

      <section className="hero">
        <div className="hero-content">
          <h2>Stay Organized & Get Things Done</h2>
          <p>Manage your tasks efficiently with our simple and powerful todo-list app</p>
          <button className="btn btn-large" onClick={() => navigate('/register')}>
            Get Started
          </button>
        </div>
        <div className="hero-image">
          <img src={todoListImage} alt="Todo List" />
        </div>
      </section>

      <section className="features">
        <h2>Why Choose Our App?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <h3>📝 Easy Task Creation</h3>
            <p>Create and organize your tasks in seconds</p>
          </div>
          <div className="feature-card">
            <h3>✅ Track Progress</h3>
            <p>Mark tasks as complete and monitor your productivity</p>
          </div>
          <div className="feature-card">
            <h3>🔒 Secure & Private</h3>
            <p>Your tasks are encrypted and kept private</p>
          </div>
          <div className="feature-card">
            <h3>📱 Access Anywhere</h3>
            <p>Access your tasks from any device, anytime</p>
          </div>
        </div>
      </section>

      <footer className="footer">
        <p>&copy; 2026 TodoList App. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default Landing