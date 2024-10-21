import { Link } from "react-router-dom"
import { FaHome, FaPowerOff, FaTasks, FaPlus, FaBook } from "react-icons/fa"
import { RiLoginBoxLine, RiUserAddLine } from "react-icons/ri"
import { GoProjectRoadmap } from "react-icons/go"
import { MdEventNote } from "react-icons/md"
import { CgProfile } from "react-icons/cg"

const Nav = ({ user, handleLogOut }) => {
  const isAdmin = user && user.role === "admin"

  const adminOptions = (
    <nav className="nav">
      <ul className="nav-list">
        <li>
          <Link to="/" className="nav-link">
            {" "}
            <FaHome /> Home{" "}
          </Link>
        </li>
        <li>
          <Link onClick={handleLogOut} to="/" className="nav-link">
            {" "}
            <FaPowerOff /> Sign Out{" "}
          </Link>
        </li>
        <li>
          <Link to="/tasks" className="nav-link">
            {" "}
            <FaTasks /> Task List{" "}
          </Link>
        </li>
        <li>
          <Link to="/tasks/new" className="nav-link">
            {" "}
            <FaPlus /> Add Task{" "}
          </Link>
        </li>
        <li>
          <Link to="/courses" className="nav-link">
            <FaBook /> Courses List
          </Link>
        </li>
        <li>
          <Link to="/courses/createcourse" className="nav-link">
            <FaPlus /> Add Course
          </Link>
        </li>
      </ul>
    </nav>
  )
  const userOptions = (
    <nav className="nav">
      <ul className="nav-list">
        <li>
          <Link to="/profile/data" className="nav-link">
            <CgProfile /> profile
          </Link>
        </li>
        <li>
          <Link to="/" className="nav-link">
            <FaHome /> Home
          </Link>
        </li>
        <li>
          <Link onClick={handleLogOut} to="/" className="nav-link">
            <FaPowerOff /> Sign Out
          </Link>
        </li>
        <li>
          <Link to="/tasks" className="nav-link">
            <FaTasks /> Task List
          </Link>
        </li>
        <li>
          <Link to="/tasks/new" className="nav-link">
            <FaPlus /> Add Task
          </Link>
        </li>
        <li>
          <Link to="/roadmap" className="nav-link">
            <GoProjectRoadmap /> Roadmap List
          </Link>
        </li>
        <li>
          <Link to="/roadmap/new" className="nav-link">
            <FaPlus /> Add Roadmap
          </Link>
        </li>
        <li>
          <Link to="/events" className="nav-link">
            <MdEventNote /> Event List
          </Link>
        </li>
        <li>
          <Link to="/events/add" className="nav-link">
            <FaPlus /> Add Event
          </Link>
        </li>
        <li>
          <Link to="/mycourses" className="nav-link">
            <FaBook /> My Courses
          </Link>
        </li>
      </ul>
    </nav>
  )

  const publicOptions = (
    <nav className="nav">
      <ul className="nav-list">
        <li>
          <Link to="/" className="nav-link">
            {" "}
            <FaHome /> Home{" "}
          </Link>
        </li>
        <li>
          <Link to="/register" className="nav-link">
            {" "}
            <RiUserAddLine /> Register{" "}
          </Link>
        </li>
        <li>
          <Link to="/login" className="nav-link">
            {" "}
            <RiLoginBoxLine /> Sign In{" "}
          </Link>
        </li>
      </ul>
    </nav>
  )

  return (
    <header>
      <div className="nav-container">
        {isAdmin ? adminOptions : user ? userOptions : publicOptions}
      </div>
    </header>
  )
}

export default Nav
