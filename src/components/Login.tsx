import { useState } from "react";
import {
  Button,
  Card,
  Form,
  Container,
  Row,
  Col,
  Alert,
  Spinner,
} from "react-bootstrap";
import logo from "../assets/msshop.png";

type Props = {
  onLogin: (username: string, password: string) => Promise<boolean>;
  isLoading?: boolean;
  error?: string | null;
};

function Login({ onLogin, isLoading = false, error }: Props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await onLogin(username, password);

    if (success) {
      // Limpia los campos después de login exitoso
      setUsername("");
      setPassword("");
      // Redirige a la página principal después de login exitoso
      window.location.hash = "#/";
    }
  };

  const handleBackClick = () => {
    window.location.hash = "#/";
  };

  return (
    <div className="login-page">
      <Container className="login-container">
        <Row className="justify-content-center align-items-center min-vh-100">
          <Col xs={12} md={10} lg={8} xl={6}>
            <Card className="login-card shadow-lg border-0">
              {/* Header con gradiente */}
              <div className="login-header">
                <div className="login-logo">
                  <div>
                    <img src={logo} alt="logo MsShop" width={150} />
                  </div>
                </div>
                <p className="login-welcome">¡Bienvenido de nuevo!</p>
              </div>

              <Card.Body className="p-4 p-md-5">
                <h3 className="login-title text-center mb-4">Iniciar Sesión</h3>

                {/* Mostrar error si hay */}
                {error && (
                  <Alert variant="danger" className="login-alert">
                    <span className="alert-icon">⚠️</span> {error}
                  </Alert>
                )}

                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-4" controlId="formUsername">
                    <Form.Label className="login-label">
                      <span className="label-icon">👤</span> Usuario
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Ingresa tu usuario"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      disabled={isLoading}
                      className="login-input"
                      autoComplete="username"
                    />
                  </Form.Group>

                  <Form.Group className="mb-4" controlId="formPassword">
                    <Form.Label className="login-label">
                      <span className="label-icon">🔒</span> Contraseña
                    </Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Ingresa tu contraseña"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      disabled={isLoading}
                      className="login-input"
                      autoComplete="current-password"
                    />
                  </Form.Group>

                  <div className="login-actions">
                    <Button
                      variant="primary"
                      type="submit"
                      className="btn-login w-100 mb-3"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <Spinner
                            animation="border"
                            size="sm"
                            className="me-2"
                          />
                          Iniciando sesión...
                        </>
                      ) : (
                        <>
                          <span className="btn-icon">🚀</span> Iniciar Sesión
                        </>
                      )}
                    </Button>

                    <Button
                      variant="outline-secondary"
                      className="btn-back w-100"
                      onClick={handleBackClick}
                      disabled={isLoading}
                    >
                      <span className="btn-icon">🏠</span> Volver a la Tienda
                    </Button>
                  </div>
                </Form>

                {/* Demo credentials hint */}
                {/* <div className="demo-hint mt-4">
                  <p className="text-center text-muted small mb-2">
                    <strong>💡 Credenciales de prueba:</strong>
                  </p>
                  <div className="demo-credentials">
                    <code>Usuario: mor_2314</code>
                    <code>Contraseña: 83r5^_</code>
                  </div>
                </div> */}
              </Card.Body>

              {/* Decorative elements */}
              <div className="login-decoration login-decoration-1"></div>
              <div className="login-decoration login-decoration-2"></div>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Background decorations */}
      <div className="login-bg-circle login-bg-circle-1"></div>
      <div className="login-bg-circle login-bg-circle-2"></div>
      <div className="login-bg-circle login-bg-circle-3"></div>
    </div>
  );
}

export default Login;
