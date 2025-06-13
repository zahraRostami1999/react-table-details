import React, { useState } from "react";
import Tables from "./components/Tables";


const fakeData = [
  {
    id: 1,
    name: "main.zip",
    size: "2.1MB",
    scanDate: "2025-06-12",
    status: "Scanned",
    detection: "Clean",
    contents: [
      {
        id: "a",
        name: "doc1.pdf",
        size: "500KB",
        scanStatus: "Scanned",
        detection: "Clean",
        details: "No threats detected."
      },
      {
        id: "b",
        name: "image1.jpg",
        size: "1.2MB",
        scanStatus: "Scanned",
        detection: "Infected",
        details: "Malware detected."
      }
    ]
  },
  {
    id: 2,
    name: "backup.zip",
    size: "3.4MB",
    scanDate: "2025-06-11",
    status: "Pending",
    detection: "-",
    contents: []
  }
];

export default function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedContent, setSelectedContent] = useState(null);

  return (
    <>
      <div className="container">
        <h2>All Scanned Files</h2>
        <table className="main-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Size</th>
              <th>Scan Date</th>
              <th>Status</th>
              <th>Detection</th>
            </tr>
          </thead>
          <tbody>
            {fakeData.map((file) => (
              <tr
                key={file.id}
                onClick={() => {
                  setSelectedFile(file);
                  setSelectedContent(null);
                }}
                className={selectedFile?.id === file.id ? "selected" : ""}
              >
                <td>{file.name}</td>
                <td>{file.size}</td>
                <td>{file.scanDate}</td>
                <td>{file.status}</td>
                <td>{file.detection}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {selectedFile && (
          <div className="details-section">
            <h3>Contents of: {selectedFile.name}</h3>
            <table className="sub-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Size</th>
                  <th>Status</th>
                  <th>Detection</th>
                </tr>
              </thead>
              <tbody>
                {selectedFile.contents.map((item) => (
                  <tr
                    key={item.id}
                    onClick={() => setSelectedContent(item)}
                    className={selectedContent?.id === item.id ? "selected" : ""}
                  >
                    <td>{item.name}</td>
                    <td>{item.size}</td>
                    <td>{item.scanStatus}</td>
                    <td>{item.detection}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {selectedContent && (
              <div className="small-table-section">
                <h4>Selected File: {selectedContent.name}</h4>
                <table className="small-table">
                  <tbody>
                    <tr>
                      <td>Size</td>
                      <td>{selectedContent.size}</td>
                    </tr>
                    <tr>
                      <td>Status</td>
                      <td>{selectedContent.scanStatus}</td>
                    </tr>
                    <tr>
                      <td>Detection</td>
                      <td>{selectedContent.detection}</td>
                    </tr>
                    <tr>
                      <td>Details</td>
                      <td>{selectedContent.details}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
      <Tables />
    </>
  );
} 
