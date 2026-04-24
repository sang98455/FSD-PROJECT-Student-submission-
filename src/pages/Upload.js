import React, { useState, useRef } from "react";

function Upload({ addProject }) {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);

  const handleUpload = () => {
    if (!title || !file) {
      alert("Please enter title and select file");
      return;
    }

    const newProject = {
      title: title,
      fileName: file.name,
    };

    addProject(newProject);

    // Clear inputs
    setTitle("");
    setFile(null);
    fileInputRef.current.value = "";
  };

  return (
    <div style={styles.container}>
      <div style={styles.form}>
        <h2>Upload Project</h2>

        <div style={styles.inputGroup}>
          <label>Project Title:</label>
          <input
            type="text"
            placeholder="Enter project title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={styles.input}
          />
        </div>

        <div style={styles.inputGroup}>
          <label>Select File:</label>
          <input
            type="file"
            ref={fileInputRef}
            onChange={(e) => setFile(e.target.files[0])}
            style={styles.fileInput}
          />
          {file && <p style={styles.fileName}>Selected: {file.name}</p>}
        </div>

        <button onClick={handleUpload} style={styles.button}>
          Upload
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    marginTop: "30px",
    marginBottom: "50px",
  },
  form: {
    border: "2px solid #28a745",
    borderRadius: "8px",
    padding: "30px",
    width: "400px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    backgroundColor: "#f9f9f9",
  },
  inputGroup: {
    marginBottom: "15px",
    textAlign: "left",
  },
  input: {
    width: "100%",
    padding: "10px",
    marginTop: "5px",
    border: "1px solid #ddd",
    borderRadius: "4px",
    boxSizing: "border-box",
    fontSize: "14px",
  },
  fileInput: {
    width: "100%",
    padding: "8px",
    marginTop: "5px",
    border: "1px solid #ddd",
    borderRadius: "4px",
    boxSizing: "border-box",
  },
  fileName: {
    marginTop: "5px",
    fontSize: "13px",
    color: "#28a745",
    fontWeight: "bold",
  },
  button: {
    width: "100%",
    padding: "10px",
    backgroundColor: "#28a745",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "bold",
    marginTop: "10px",
    transition: "background-color 0.3s",
  },
};

export default Upload;