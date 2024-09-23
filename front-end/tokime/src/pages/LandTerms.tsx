import React from 'react';
import { Link } from 'react-router-dom';

function LandTerms() {
  const terms = ['용어1', '용어2', '용어3']; // 예시 용어 리스트

  return (
    <div>
      <h2>토지용어사전</h2>
      <ul>
        {terms.map((term) => (
          <li key={term}>
            <Link to={`/land-terms/${term}`}>{term}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default LandTerms;
