import React from "react";

function View({ projects, onDelete }) {
  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <h2>View Submitted Projects</h2>

        {projects.length === 0 ? (
          <p style={styles.emptyMessage}>No projects uploaded yet.</p>
        ) : (
          <ul style={styles.list}>
            {projects.map((project, index) => (
              <li key={index} style={styles.listItem}>
                <div style={styles.projectInfo}>
                  <div>
                    <strong>Title:</strong> {project.title}
                    <br />
                    <strong>File:</strong> {project.fileName}
                  </div>
                </div>
                <button
                  onClick={() => onDelete(index)}
                  style={styles.deleteBtn}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
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
  content: {
    border: "2px solid #17a2b8",
    borderRadius: "8px",
    padding: "30px",
    width: "500px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    backgroundColor: "#f9f9f9",
  },
  list: {
    listStyle: "none",
    padding: 0,
  },
  listItem: {
    backgroundColor: "#ffffff",
    border: "1px solid #ddd",
    padding: "15px",
    marginBottom: "10px",
    borderRadius: "4px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  projectInfo: {
    flex: 1,
  },
  deleteBtn: {
    backgroundColor: "#dc3545",
    color: "white",
    border: "none",
    padding: "8px 15px",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "bold",
    marginLeft: "10px",
    transition: "background-color 0.3s",
  },
  emptyMessage: {
    color: "#666",
    fontSize: "16px",
    textAlign: "center",
  },
};

export default View;
