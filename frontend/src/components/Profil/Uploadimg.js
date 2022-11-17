import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uploadPicture } from "../../redux/userSlice";

const UploadImg = () => {
  const [file, setFile] = useState();
  const dispatch = useDispatch();
  const authData = useSelector((state) => state.auth.user);

  const handlePicture = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", authData.pseudo);
    data.append("userId", authData._id);
    data.append("file", file);

    dispatch(uploadPicture(data, authData._id));
  };

  return (
    <form action="" onSubmit={handlePicture} className="upload-pic">
      <label htmlFor="file">Changer d'image</label>
      <input
        type="file"
        id="file"
        name="file"
        accept=".jpg, .jpeg, .png"
        onChange={(e) => setFile(e.target.files[0])}
      />
      <br/>
      <input type="submit" value="Envoyer" />
    </form>
  );
};

export default UploadImg;