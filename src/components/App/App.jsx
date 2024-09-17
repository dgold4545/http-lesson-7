import { useEffect, useState } from "react";
import axios from "axios";

import { fetchUser } from "../../githubAPI";

import ArticleList from "../ArticleList/ArticleList";

import { ProgressBar } from "react-loader-spinner";

import React from "react";

import style from "./App.module.css";
import { Field, Form, Formik } from "formik";

export default function App() {
  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState(false);

  const handleSearch = (values, actions) => {
    const fetchGithubUser = async () => {
      try {
        setLoading(true);
        setUser(null);

        setError(false);
        const response = await fetchUser(values.username);

        setUser(response.data);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchGithubUser();

    actions.resetForm();
  };

  return (
    <div className={style.container}>
      <h1>HTTP requests in React</h1>
      <Formik initialValues={{ username: "" }} onSubmit={handleSearch}>
        <Form>
          <Field type="text" name="username" />
          <button type="submit">Search</button>
        </Form>
      </Formik>
      {loading && <ProgressBar />}
      {error && <p>OOPS.... Sorry about this bad request</p>}
      {user && (
        <div>
          <img src={user.avatar_url} alt={user.name} />
          <p>{user.company}</p>
          <p>{user.followers}</p>
          <p>{user.name}</p>
          <p>{user.login}</p>
        </div>
      )}
    </div>
  );
}

//"https://api.github.com/users/USERNAME"
//luxplanjay
//dgold4545
