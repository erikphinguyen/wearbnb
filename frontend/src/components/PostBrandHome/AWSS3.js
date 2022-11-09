import { useState } from "react";
import { thunkPostImage } from "../../store/uploads";
import { useDispatch, useSelector } from "react-redux";

const AWSS3 = () => {
  const [image, setImage] = useState(null);
  // for multuple file upload
  //   const [images, setImages] = useState([]);
  const [errors, setErrors] = useState([]);

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    console.log('WHAT IS E', e)
    e.preventDefault();
    let newErrors = [];
    dispatch(thunkPostImage({ image }))
      .then(() => {
        console.log('WHAT IS IMAGE IN HANDLE SUBMIT', image)
        setImage(null);
      })
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          newErrors = data.errors;
          setErrors(newErrors);
        }
      });
  };

  const updateFile = (e) => {
    const file = e.target.files[0];
    console.log('WHAT IS FILE FRONT END', file)
    if (file) setImage(file);
  };

  // for multiple file upload
  //   const updateFiles = (e) => {
  //     const files = e.target.files;
  //     setImages(files);
  //   };

  return (
    <div>
      <h2>Or Upload Brand Image via File</h2>
      {errors.length > 0 &&
        errors.map((error) => <div key={error}>{error}</div>)}
      <form onSubmit={handleSubmit}>
        <label>
          <input type="file" accept="image/*" />
        </label>
        {/* <label>
            Multiple Upload
            <input
              type="file"
              multiple
              onChange={updateFiles} />
          </label> */}
        <button type="submit" onClick={updateFile}>Submit</button>
      </form>

    </div>
  );
};

export default AWSS3;
