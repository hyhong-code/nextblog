import { useState } from "react";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";

const INITIAL_FORMDATA = {
  email: "",
  password: "",
  passwordConfirm: "",
};

const register = () => {
  const [formData, setFormData] = useState(INITIAL_FORMDATA);
  const { email, password, passwordConfirm } = formData;

  const INPUT_FIELDS = [
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
    try {
      console.log(formData);
    } catch (error) {}
  };

  return (
    <Grid container>
      <Grid item xs={1} sm={2} md={4} />
      <Grid item xs>
        <Card>
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
              style={{ marginTop: "1rem" }}
            >
              Sign up
            </Button>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={1} sm={2} md={4} />
    </Grid>
  );
};

export default register;
