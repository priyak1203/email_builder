import { useEffect, useRef, useState } from 'react';
import DOMPurify from 'dompurify';
import EditLayout from './EditLayout';

function Template() {
  const [layout, setLayout] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  const fetchData = async () => {
    const response = await fetch(`http://localhost:5000/getEmailLayout`);
    const data = await response.text();
    setLayout(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const safeHTML = DOMPurify.sanitize(layout);

  return (
    <div className="template-container">
      {isEditing ? (
        <EditLayout />
      ) : (
        <div dangerouslySetInnerHTML={{ __html: safeHTML }} />
      )}
    </div>
  );
}

export default Template;
