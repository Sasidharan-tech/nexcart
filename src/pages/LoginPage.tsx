import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
    PageSection,
    Card,
    CardBody,
    Form,
    FormGroup,
    TextInput,
    Button,
    Alert,
    Title,
    InputGroup,
    InputGroupItem
} from '@patternfly/react-core';
import { EyeIcon, EyeSlashIcon } from '@patternfly/react-icons';
import { useAuth } from '../context/AuthContext';
import './LoginPage.css';

export const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        if (!email || !password) {
            setError('Please fill in all fields');
            setIsLoading(false);
            return;
        }

        const success = await login(email, password);
        setIsLoading(false);

        if (success) {
            navigate('/');
        } else {
            setError('Invalid email or password');
        }
    };

    return (
        <PageSection className="login-page">
            <div className="login-container">
                <Card className="login-card">
                    <CardBody>
                        <div className="login-header">
                            <Title headingLevel="h1" size="2xl" className="login-title">
                                Welcome Back
                            </Title>
                            <p className="login-subtitle">Sign in to continue shopping</p>
                        </div>

                        {error && (
                            <Alert variant="danger" title={error} isInline className="login-alert" />
                        )}

                        <Form onSubmit={handleSubmit} className="login-form">
                            <FormGroup label="Email" isRequired fieldId="email">
                                <InputGroup>
                                    <InputGroupItem isFill>
                                        <TextInput
                                            id="email"
                                            type="email"
                                            value={email}
                                            onChange={(_event, value) => setEmail(value)}
                                            placeholder="Enter your email"
                                            isRequired
                                        />
                                    </InputGroupItem>
                                </InputGroup>
                            </FormGroup>

                            <FormGroup label="Password" isRequired fieldId="password">
                                <InputGroup>
                                    <InputGroupItem isFill>
                                        <TextInput
                                            id="password"
                                            type={showPassword ? 'text' : 'password'}
                                            value={password}
                                            onChange={(_event, value) => setPassword(value)}
                                            placeholder="Enter your password"
                                            isRequired
                                        />
                                    </InputGroupItem>
                                    <InputGroupItem>
                                        <Button
                                            variant="control"
                                            onClick={() => setShowPassword(!showPassword)}
                                            aria-label={showPassword ? 'Hide password' : 'Show password'}
                                        >
                                            {showPassword ? <EyeSlashIcon /> : <EyeIcon />}
                                        </Button>
                                    </InputGroupItem>
                                </InputGroup>
                            </FormGroup>

                            <Button
                                type="submit"
                                variant="primary"
                                isBlock
                                isLoading={isLoading}
                                className="login-button"
                            >
                                {isLoading ? 'Signing in...' : 'Sign In'}
                            </Button>
                        </Form>

                        <div className="login-footer">
                            <p>
                                Don't have an account?{' '}
                                <Link to="/register" className="register-link">
                                    Create one now
                                </Link>
                            </p>
                        </div>
                    </CardBody>
                </Card>

                <div className="login-decoration">
                    <div className="decoration-circle circle-1"></div>
                    <div className="decoration-circle circle-2"></div>
                    <div className="decoration-circle circle-3"></div>
                </div>
            </div>
        </PageSection>
    );
};
