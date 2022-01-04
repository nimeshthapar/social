import React, { useRef, useState, useEffect } from 'react';

import classes from './ImageUpload.module.css';
import Button from '../Button';

const ImageUpload = (props) => {
  const inputPickerRef = useRef();

  const [file, setFile] = useState();
  const [previewUrl, setPreviewUrl] = useState();

  const pickImageHandler = () => {
    inputPickerRef.current.click();
  };

  useEffect(() => {
    if (!file) {
      return;
    }

    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  }, [file]);

  const pickUpChangeHandler = (e) => {
    let pickedFile;
    if (e.target.files || e.target.files.length === 1) {
      pickedFile = e.target.files[0];
      setFile(pickedFile);
      props.onAdd(e.target.files[0]);
    }
  };

  return (
    <div className={classes['form-control']}>
      <input
        id={props.id}
        ref={inputPickerRef}
        type="file"
        style={{ display: 'none' }}
        accept=".jpg,.jpeg,.png"
        onChange={pickUpChangeHandler}
      />
      <div
        className={`${classes['image-upload']} ${
          props.center && classes['center']
        }`}
      >
        <div className={classes['image-upload__preview']}>
          {previewUrl && <img src={previewUrl} alt="preveiw" />}
          {!previewUrl && <p>Please Pick an Image</p>}
        </div>
        <Button inverse onClick={pickImageHandler}>
          Pick Image
        </Button>
      </div>
    </div>
  );
};

export default ImageUpload;
