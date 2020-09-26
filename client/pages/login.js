import { useState } from "react";
import NextLink from "next/link";
import Router from "next/router";
import axios from "../utils/axios";
import { toast } from "react-toastify";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import CircularProgress from "@material-ui/core/CircularProgress";

import { API } from "../config";

const INITIAL_FORMDATA = {
  email: "",
  password: "",
};

const login = () => {
  const [formData, setFormData] = useState(INITIAL_FORMDATA);
  const [loading, setLoading] = useState(false);
  const { email, password } = formData;

  const INPUT_FIELDS = [
    { label: "Email", name: "email", value: email },
    { label: "Password", name: "password", value: password },
  ];

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    setLoading(true);
    try {
      await axios.post(`${API}/v1/auth/login`, formData);
      toast.success("Sign in success.");
      setFormData(INITIAL_FORMDATA);
      Router.push("/");
    } catch (error) {
      console.error("[LOGIN ERROR]", error.response);
      toast.error(error.response.data.errors.map((e) => e.msg).join(" "));
    }
    setLoading(false);
  };

  return (
    <Grid container>
      <Grid item xs={1} sm={2} md={4} />
      <Grid item xs>
        <Card>
          <CardContent component="form" onSubmit={handleSubmit}>
            <Typography variant="h4" component="h1" align="center">
              Sign in
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
              {loading ? <CircularProgress size={24} /> : "Sign in"}
            </Button>
            <Typography align="center" style={{ fontSize: "0.75rem" }}>
              Don't own an account?{" "}
              <NextLink href="/register">
                <Link style={{ cursor: "pointer" }}>Sign up.</Link>
              </NextLink>{" "}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={1} sm={2} md={4} />
    </Grid>
  );
};

export default login;
