import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
  addDoc,
  serverTimestamp,
  updateDoc,
  deleteDoc,
  doc,
  getDoc,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { auth, db, storage } from "../firebase";

function StudentDashboard({ user }) {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editId, setEditId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [userProfile, setUserProfile] = useState(null);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return;
    const userDoc = doc(db, "users", user.uid);
    getDoc(userDoc).then((snapshot) => {
      if (snapshot.exists()) {
        setUserProfile(snapshot.data());
      }
    });
  }, [user]);

  useEffect(() => {
    if (!user) return;
    const q = query(
      collection(db, "projects"),
      where("userId", "==", user.uid),
      orderBy("date", "desc")
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const items = snapshot.docs.map((docItem) => ({ id: docItem.id, ...docItem.data() }));
      setProjects(items);
    });
    return unsubscribe;
  }, [user]);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  const handleUpload = async (event) => {
    event.preventDefault();
    if (!title || !file) {
      alert("Please enter project title and select a file.");
      return;
    }

    setLoading(true);
    const storagePath = `projects/${user.uid}/${Date.now()}_${file.name}`;
    const fileRef = ref(storage, storagePath);

    try {
      await uploadBytes(fileRef, file);
      const fileURL = await getDownloadURL(fileRef);
      await addDoc(collection(db, "projects"), {
        projectTitle: title,
        fileName: file.name,
        fileURL,
        storagePath,
        userId: user.uid,
        userName: userProfile?.name || "",
        userEmail: userProfile?.email || user.email,
        status: "Pending",
        date: serverTimestamp(),
      });
      setTitle("");
      setFile(null);
      fileInputRef.current.value = "";
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (project) => {
    if (!window.confirm("Delete this project?")) return;
    try {
      await deleteDoc(doc(db, "projects", project.id));
      const fileRef = ref(storage, project.storagePath);
      await deleteObject(fileRef).catch(() => {});
    } catch (error) {
      alert(error.message);
    }
  };

  const startEdit = (project) => {
    setEditId(project.id);
    setEditTitle(project.projectTitle);
  };

  const saveEdit = async () => {
    if (!editTitle) {
      alert("Project title cannot be empty.");
      return;
    }
    try {
      const projectDoc = doc(db, "projects", editId);
      await updateDoc(projectDoc, { projectTitle: editTitle });
      setEditId(null);
      setEditTitle("");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="dashboard-card">
      <div className="navbar-top">
        <button className="secondary-button" onClick={handleLogout}>Logout</button>
      </div>
      <h2>Student Dashboard</h2>
      <p className="empty-state">Upload your project and manage your submissions.</p>

      <form onSubmit={handleUpload} className="page-card" style={{ padding: 24 }}>
        <div className="form-group">
          <label>Project Title</label>
          <input
            className="input-field"
            type="text"
            placeholder="Enter project title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>File Upload</label>
          <input
            className="input-field"
            type="file"
            ref={fileInputRef}
            onChange={(e) => setFile(e.target.files[0])}
          />
        </div>
        <button className="primary-button" type="submit" disabled={loading}>
          {loading ? "Uploading..." : "Upload Project"}
        </button>
      </form>

      <div className="table-wrapper">
        <table className="table-simple">
          <thead>
            <tr>
              <th>Title</th>
              <th>File</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.length === 0 ? (
              <tr>
                <td colSpan="4" className="empty-state">No projects found.</td>
              </tr>
            ) : (
              projects.map((project) => (
                <tr key={project.id}>
                  <td>
                    {editId === project.id ? (
                      <input
                        className="input-field"
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                      />
                    ) : (
                      project.projectTitle
                    )}
                  </td>
                  <td>{project.fileName}</td>
                  <td>
                    <span className={`status-badge status-${project.status.toLowerCase()}`}>
                      {project.status}
                    </span>
                  </td>
                  <td style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                    {editId === project.id ? (
                      <>
                        <button className="action-button" onClick={saveEdit}>Save</button>
                        <button className="secondary-button" onClick={() => setEditId(null)}>Cancel</button>
                      </>
                    ) : (
                      <>
                        <button className="secondary-button" onClick={() => startEdit(project)}>Update</button>
                        <button className="danger-button" onClick={() => handleDelete(project)}>Delete</button>
                      </>
                    )}
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

export default StudentDashboard;
