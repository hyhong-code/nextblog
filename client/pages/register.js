import { useState, useContext } from "react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import CircularProgress from "@material-ui/core/CircularProgress";

import { AuthContext, loadUser, register } from "../context/authContext";

const INITIAL_FORMDATA = {
  name: "",
  email: "",
  password: "",
  passwordConfirm: "",
};

const Register = () => {
  const { dispatch } = useContext(AuthContext);
  const router = useRouter();
  const [formData, setFormData] = useState(INITIAL_FORMDATA);
  const [loading, setLoading] = useState(false);
  const { name, email, password, passwordConfirm } = formData;

  const INPUT_FIELDS = [
    { label: "Name", name: "name", value: name },
    { label: "Email", name: "email", value: email },
    { label: "Password", name: "password", value: password },
    {
      label: "Confirm Password",
      name: "passwordConfirm",
      value: passwordConfirm,
    },
  ];

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    setLoading(true);
    try {
      await register(name, email, password);
      await loadUser(dispatch, router);
      toast.success("Sign up success, you are now logged in.");
      setFormData(INITIAL_FORMDATA);
    } catch (error) {
      console.error("[REGISTER ERROR]", error.response);
      toast.error(error.response.data.errors.map((e) => e.msg).join(" "));
    }
    setLoading(false);
  };

  return (
    <Grid container>
      <Grid item xs={1} sm={2} md={4} />
      <Grid item xs>
        <Card elevation={3}>
          <CardContent component="form" onSubmit={handleSubmit}>
            <Typography variant="h4" component="h1" align="center">
              Sign up
            </Typography>
            {INPUT_FIELDS.map(({ label, name, value }) => (
              <TextField
                key={`register-${name}`}
                id={`register-${name}`}
                label={label}
                name={name}
                value={value}
                onChange={handleChange}
                fullWidth
              />
            ))}
            <Button
              variant="contained"
              color="primary"
              fullWidth
              type="submit"
              style={{ marginTop: "1rem", marginBottom: "0.5rem" }}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : "Sign up"}
            </Button>
            <Typography align="center" style={{ fontSize: "0.75rem" }}>
              Already owns an account?{" "}
              <NextLink href="/login">
                <Link style={{ cursor: "pointer" }}>Sign in.</Link>
              </NextLink>
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={1} sm={2} md={4} />
    </Grid>
  );
};

export default Register;
