import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { ref, deleteObject } from "firebase/storage";
import { auth, db, storage } from "../firebase";

function AdminDashboard({ user }) {
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return;
    const q = query(collection(db, "projects"), orderBy("date", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setProjects(snapshot.docs.map((docItem) => ({ id: docItem.id, ...docItem.data() })));
    });
    return unsubscribe;
  }, [user]);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  const updateStatus = async (projectId, status) => {
    try {
      await updateDoc(doc(db, "projects", projectId), { status });
    } catch (error) {
      alert(error.message);
    }
  };

  const handleDelete = async (project) => {
    if (!window.confirm("Delete this project permanently?")) return;
    try {
      await deleteDoc(doc(db, "projects", project.id));
      const fileRef = ref(storage, project.storagePath);
      await deleteObject(fileRef).catch(() => {});
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="dashboard-card">
      <div className="navbar-top">
        <button className="secondary-button" onClick={handleLogout}>Logout</button>
      </div>
      <h2>Admin Dashboard</h2>
      <p className="empty-state">Review and manage all student project submissions.</p>

      <div className="table-wrapper">
        <table className="table-simple">
          <thead>
            <tr>
              <th>Student</th>
              <th>Title</th>
              <th>File</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.length === 0 ? (
              <tr>
                <td colSpan="5" className="empty-state">No project submissions found.</td>
              </tr>
            ) : (
              projects.map((project) => (
                <tr key={project.id}>
                  <td>{project.userName || project.userEmail || "Unknown"}</td>
                  <td>{project.projectTitle}</td>
                  <td>
                    <a href={project.fileURL} target="_blank" rel="noreferrer" className="link-button">
                      Download
                    </a>
                  </td>
                  <td>
                    <span className={`status-badge status-${project.status.toLowerCase()}`}>
                      {project.status}
                    </span>
                  </td>
                  <td style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                    <button className="action-button" onClick={() => updateStatus(project.id, "Approved")}>Approve</button>
                    <button className="secondary-button" onClick={() => updateStatus(project.id, "Rejected")}>Reject</button>
                    <button className="danger-button" onClick={() => handleDelete(project)}>Delete</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminDashboard;
