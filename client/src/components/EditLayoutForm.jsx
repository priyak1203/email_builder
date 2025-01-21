import { useState } from 'react';
import customFetch from '../utils/customFetch';

function EditLayoutForm() {
  const [layoutContent, setLayoutContent] = useState({
    title: '',
    content: '',
  });

  const handleChange = (e) => {
    setLayoutContent({ ...layoutContent, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(layoutContent);

    // input validations
    // Form Submission
    // post api call
    // reset editing flag

    const response = await customFetch.post(
      `/uploadEmailConfig`,
      layoutContent
    );
    console.log(response);
  };

  return (
    <div>
      <form className="page" onSubmit={handleSubmit}>
        <div>
          <p className="logo">logo</p>
        </div>
        <div>
          <input
            placeholder="enter title"
            className="title title-input"
            name="title"
            value={layoutContent.title}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div>
          <textarea
            placeholder="enter content"
            className="content content-output"
            name="content"
            value={layoutContent.content}
            onChange={(e) => handleChange(e)}
            maxLength={500}
          />
        </div>

        <button className="btn-primary submit-btn">Submit</button>
      </form>
    </div>
  );
}

export default EditLayoutForm;
