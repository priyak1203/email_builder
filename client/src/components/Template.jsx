import { useEffect, useState } from 'react';
import DOMPurify from 'dompurify';
import EditLayoutForm from './EditLayoutForm';
import { useAppContext } from '../context';
import customFetch from '../utils/customFetch';

function Template() {
  const [layout, setLayout] = useState('');

  const { isEditing } = useAppContext();

  const fetchData = async () => {
    const response = await customFetch.get(`/getEmailLayout`);
    setLayout(response.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const safeHTML = DOMPurify.sanitize(layout);

  return (
    <div className="template-container">
      {isEditing ? (
        <EditLayoutForm />
      ) : (
        <div dangerouslySetInnerHTML={{ __html: safeHTML }} />
      )}
    </div>
  );
}

export default Template;
