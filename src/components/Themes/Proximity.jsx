import React, { useState, useEffect } from "react";

function PortfolioBasic({ url }) {
  const appUrl = import.meta.env.VITE_BACKEND_API;

  const [portfolio, setPortfolio] = useState({
    username: "",
    profileimg: "",
    description: "",
    tag: "",
    url: "",
    social: [],
    skills: [],
    projects: [],
    experience: []
  });

  useEffect(() => {
    async function fetchPortfolio() {
      try {
        const res = await fetch(`${appUrl}/api/getportfolio/${url}`);
        const data = await res.json();
        if (res.ok) {
          setPortfolio(data.portfolio);
        }
      } catch (err) {
        console.error(err);
      }
    }
    fetchPortfolio();
  }, [url]);

  return (
    <div className="p-6">
      {/* Basic Info */}
      <h1>{portfolio.username}</h1>
      <p>{portfolio.tag}</p>
      <img
        src={portfolio.profileimg}
        alt="Profile"
        style={{ width: "150px", borderRadius: "8px" }}
      />
      <p>{portfolio.description}</p>

      {/* Social */}
      {portfolio.social.length > 0 && (
        <div>
          <h2>Social Links</h2>
          <ul>
            {portfolio.social.map((s, i) => (
              <li key={i}>
                {s.title}: <a href={s.link}>{s.link}</a>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Skills */}
      {portfolio.skills.length > 0 && (
        <div>
          <h2>Skills</h2>
          <ul>
            {portfolio.skills.map((s, i) => (
              <li key={i}>{s.title}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Projects */}
      {portfolio.projects.length > 0 && (
        <div>
          <h2>Projects</h2>
          <ul>
            {portfolio.projects.map((p, i) => (
              <li key={i}>
                <h3>{p.title}</h3>
                {p.img && <img src={p.img} alt={p.title} width="100" />}
                <p>{p.description}</p>
                {p.link && (
                  <a href={p.link} target="_blank" rel="noreferrer">
                    Visit
                  </a>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Experience */}
      {portfolio.experience.length > 0 && (
        <div>
          <h2>Experience</h2>
          {portfolio.experience.map((exp, i) => (
            <div key={i}>
              <h3>{exp.title}</h3>
              <p>{exp.company}</p>
              <p>
                {exp.startdate} - {exp.endDate || (exp.current ? "Present" : "")}
              </p>
              <p>{exp.location}</p>
              {exp.highlight && (
                <ul>
                  {exp.highlight.map((h, j) => (
                    <li key={j}>{h}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default PortfolioBasic;
