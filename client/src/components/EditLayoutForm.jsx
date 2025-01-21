import { useState } from 'react';
import customFetch from '../utils/customFetch';
import { useAppContext } from '../context';

function EditLayoutForm() {
  const [layoutContent, setLayoutContent] = useState({
    title: '',
    content: '',
    footer: '',
    imageUrl: '',
  });

  const { clearEditing } = useAppContext();

  const handleChange = (e) => {
    setLayoutContent({ ...layoutContent, [e.target.name]: e.target.value });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('logoImg', file);
    const { data } = await customFetch.post('/uploadImage', formData);
    setLayoutContent({ ...layoutContent, imageUrl: data.imageUrl });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await customFetch.post(
      `/uploadEmailConfig`,
      layoutContent
    );

    // reset editing flag
    clearEditing();
  };

  return (
    <>
      <form className="page" onSubmit={handleSubmit}>
        <div className="logo logo-input">
          <input
            type="file"
            accept="image/*"
            name="logoImg"
            onChange={handleImageUpload}
          />
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
        <div>
          <input
            placeholder="enter footer text"
            className="footer footer-input"
            name="footer"
            value={layoutContent.footer}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <button className="btn-primary submit-btn">Submit</button>
      </form>
    </>
  );
}

export default EditLayoutForm;
