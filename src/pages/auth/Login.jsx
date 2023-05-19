import React from 'react'
import Page from '../../components/Page';
import { useAuth } from '../../context/auth';

function Login() {
  const auth = useAuth();
  const [loading, setLoading] = React.useState(false);
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    const userData = {
      user: data.get('user'),
      password: data.get('password'),
    }
    console.log(userData);
    await auth.login(userData);

  };

  return (
    <>
      <Page title="Login | hire2inspire">
        <form onSubmit={handleSubmit}>
          <input type="text" name="user" id="user" placeholder='username' />
          <input type="password" name="password" id="password" placeholder='password' />
          <button type='submit'>login</button>
        </form>
      </Page>
    </>
  )
}

export default Login