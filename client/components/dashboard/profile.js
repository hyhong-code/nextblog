import { Fragment, useContext, useState, useEffect } from "react";
import { DropzoneArea } from "material-ui-dropzone";
import { toast } from "react-toastify";

import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import CircularProgress from "@material-ui/core/CircularProgress";

import resizeFile from "../../utils/resizeFile";
import ImageFadeIn from "react-image-fade-in";
import useRefreshDropZone from "../../hooks/useRefreshDropzone";
import { AuthContext } from "../../context/authContext";
import axios from "../../utils/axios";
import { API } from "../../config";
import { Button } from "@material-ui/core";

const INITIAL_FORMDATA = {
  username: "",
  name: "",
  email: "",
  photo: null,
  password: "",
};

const profile = () => {
  const {
    state: { user },
    dispatch,
  } = useContext(AuthContext);
  const [formData, setFormData] = useState(INITIAL_FORMDATA);
  const { username, name, email, photo, password } = formData;
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username,
        name: user.name,
        email: user.email,
      });
    }
  }, [user]);

  const { show, refresh } = useRefreshDropZone();

  const handleFile = async (files) => {
    if (files?.length) {
      const photoUri = await resizeFile(files[0]);
      setFormData((prev) => ({ ...prev, photo: photoUri }));
    } else {
      setFormData((prev) => ({ ...prev, photo: null }));
    }
  };

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async (evt) => {
    evt.preventDefault();
    setLoading(true);
    try {
      let body = { username, name, email };
      if (photo) body.photo = photo;
      if (password) body.password = password;
      const res = await axios.put(`${API}/v1/users`, body);
      dispatch({ type: "USER_UPDATED", payload: res.data.data.user });
      refresh();
      toast.success("Update success.");
      setFormData((prev) => ({ ...prev, password: "" }));
    } catch (error) {
      console.error("[UPDATE PROFILE ERROR]", error);
      toast.error(error.response.data.errors.map((e) => e.msg).join(" "));
    }
    setLoading(false);
  };

  return (
    <Fragment>
      <Typography variant="h5" component="h2" paragraph>
        Welcome back, {user?.name} !
      </Typography>

      {user?.photo && (
        <ImageFadeIn
          src={user.photo.url}
          alt={name}
          transition={1000}
          height={150}
          width={150}
          style={{
            height: 150,
            width: 150,
            borderRadius: 10,
            objectFit: "cover",
          }}
        />
      )}

      <Box component="form" onSubmit={handleUpdate}>
        <TextField
          fullWidth
          id="user-profile-username"
          label="Update username"
          name="username"
          value={username}
          onChange={handleChange}
          style={{ marginBottom: "1rem" }}
          disabled={loading}
        />
        <TextField
          fullWidth
          id="user-profile-name"
          label="Update name"
          name="name"
          value={name}
          onChange={handleChange}
          style={{ marginBottom: "1rem" }}
          disabled={loading}
        />
        <TextField
          fullWidth
          id="user-profile-email"
          label="Update email"
          name="email"
          value={email}
          onChange={handleChange}
          style={{ marginBottom: "1rem" }}
          disabled={loading}
        />
        <TextField
          fullWidth
          id="user-profile-password"
          label="Update password"
          name="password"
          value={password}
          onChange={handleChange}
          style={{ marginBottom: "1rem" }}
          disabled={loading}
          InputProps={{ type: "password" }}
        />

        {show && (
          <DropzoneArea
            filesLimit={1}
            dropzoneText={`Drop or click to ${
              user?.photo ? "update your" : "upload a"
            } profile image.`}
            onChange={handleFile}
            acceptedFiles={["image/*"]}
          />
        )}

        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : "Update"}
        </Button>
      </Box>
    </Fragment>
  );
};

export default profile;
