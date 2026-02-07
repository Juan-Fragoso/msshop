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
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <Row className="w-100">
        <Col md={6} lg={4} className="mx-auto">
          <Card className="shadow-lg">
            <Card.Header className="bg-primary text-white text-center">
              <Card.Title className="mb-0">MsShop</Card.Title>
            </Card.Header>
            <Card.Body>
              <Card.Title className="text-center mb-4">
                Inicia Sesión
              </Card.Title>

              {/* Mostrar error si hay */}
              {error && <Alert variant="danger">{error}</Alert>}

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formUsername">
                  <Form.Label>Usuario</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Tu usuario"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    disabled={isLoading}
                  />
                </Form.Group>

                <Form.Group className="mb-4" controlId="formPassword">
                  <Form.Label>Contraseña</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Tu contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={isLoading}
                  />
                </Form.Group>

                <Button
                  variant="primary"
                  type="submit"
                  className="w-100 mb-2"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Spinner animation="border" size="sm" className="me-2" />
                      Iniciando sesión...
                    </>
                  ) : (
                    "Iniciar Sesión"
                  )}
                </Button>
                <Button
                  variant="outline-secondary"
                  className="w-100"
                  onClick={handleBackClick}
                  disabled={isLoading}
                >
                  Volver a la Tienda
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;
