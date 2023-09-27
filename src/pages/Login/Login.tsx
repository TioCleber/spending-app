import { Alert, Button, CircularProgress } from '@mui/material'
import Register from '../../components/Register/Register'

import { useLogin } from '../../hooks/useLogin'
import { InputPassword } from '../../components/Inputs/InputPassword'
import { InputText } from '../../components/Inputs/InputText'

import './../../styles/login.css'

const Login = () => {
  const { handleLogin, login, error, loading, setLogin } = useLogin()

  return (
    <section className="section-login">
      <div className="institutional-login"></div>

      <div className="login">
        <div className="container-login">
          {!error ? (
            ''
          ) : (
            <div className="container-alert">
              <Alert className="alert-error" variant="filled" severity="error">
                {error}
              </Alert>
            </div>
          )}

          <h1 className="title-login">Faça Login</h1>

          <div className="container-input input-groups">
            <InputText
              label="E-mail"
              name="email"
              setState={setLogin}
              state={login}
              value={login.email}
            />

            <InputPassword
              label="Senha"
              name="password"
              state={login}
              setState={setLogin}
              value={login.password}
            />
          </div>

          <div className="container-buttons buttons-groups">
            <Button
              className="button button-login"
              onClick={handleLogin}
              variant="outlined"
              disabled={loading}
            >
              {loading ? (
                <CircularProgress
                  style={{ width: 24, height: 24 }}
                  className="loading"
                />
              ) : (
                'Login'
              )}
            </Button>
          </div>

          <Register />
        </div>
      </div>
    </section>
  )
}

export default Login
