import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          My career <span>&</span>
          <br /> experience
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>B.Tech in Computer Science and Engineering</h4>
                <h5>Silicon Institute of Technology, Bhubaneswar</h5>
              </div>
              <h3>2021 - 2025</h3>
            </div>
            <p>
              Solved 800+ DSA problems across CodeChef, LeetCode, and
              GeeksforGeeks, reached 4-star on CodeChef, and secured Global Rank
              65 in Starters 247. Runner-up at Trithon State-Level Hackathon and
              Finalist at Smart Odisha National Hackathon.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Software Engineer</h4>
                <h5>Mindfire Solutions Digital LLP, Bhubaneswar</h5>
              </div>
              <h3>NOW</h3>
            </div>
            <p>
              Owned the design and delivery of 50+ RESTful APIs using C#, .NET
              Core, and SQL Server, reducing API response times from 800ms to
              260ms. Implemented JWT authentication and RBAC across 10+ backend
              modules, resolving 40+ production defects and reducing recurring
              release issues by 30%.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
