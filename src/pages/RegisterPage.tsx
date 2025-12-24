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
import './RegisterPage.css';

export const RegisterPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const { register } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        // Validation
        if (!name || !email || !password || !confirmPassword) {
            setError('Please fill in all fields');
            setIsLoading(false);
            return;
        }

        if (password.length < 6) {
            setError('Password must be at least 6 characters long');
            setIsLoading(false);
            return;
        }

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            setIsLoading(false);
            return;
        }

        const success = await register(name, email, password);
        setIsLoading(false);

        if (success) {
            navigate('/');
        } else {
            setError('Email already exists. Please use a different email.');
        }
    };

    return (
        <PageSection className="register-page">
            <div className="register-container">
                <Card className="register-card">
                    <CardBody>
                        <div className="register-header">
                            <Title headingLevel="h1" size="2xl" className="register-title">
                                Create Account
                            </Title>
                            <p className="register-subtitle">Join us and start shopping today!</p>
                        </div>

                        {error && (
                            <Alert variant="danger" title={error} isInline className="register-alert" />
                        )}

                        <Form onSubmit={handleSubmit} className="register-form">
                            <FormGroup label="Full Name" isRequired fieldId="name">
                                <InputGroup>
                                    <InputGroupItem isFill>
                                        <TextInput
                                            id="name"
                                            type="text"
                                            value={name}
                                            onChange={(_event, value) => setName(value)}
                                            placeholder="Enter your full name"
                                            isRequired
                                        />
                                    </InputGroupItem>
                                </InputGroup>
                            </FormGroup>

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
                                            placeholder="Create a password (min. 6 characters)"
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

                            <FormGroup label="Confirm Password" isRequired fieldId="confirmPassword">
                                <InputGroup>
                                    <InputGroupItem isFill>
                                        <TextInput
                                            id="confirmPassword"
                                            type={showConfirmPassword ? 'text' : 'password'}
                                            value={confirmPassword}
                                            onChange={(_event, value) => setConfirmPassword(value)}
                                            placeholder="Confirm your password"
                                            isRequired
                                        />
                                    </InputGroupItem>
                                    <InputGroupItem>
                                        <Button
                                            variant="control"
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                            aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                                        >
                                            {showConfirmPassword ? <EyeSlashIcon /> : <EyeIcon />}
                                        </Button>
                                    </InputGroupItem>
                                </InputGroup>
                            </FormGroup>

                            <Button
                                type="submit"
                                variant="primary"
                                isBlock
                                isLoading={isLoading}
                                className="register-button"
                            >
                                {isLoading ? 'Creating Account...' : 'Create Account'}
                            </Button>
                        </Form>

                        <div className="register-footer">
                            <p>
                                Already have an account?{' '}
                                <Link to="/login" className="login-link">
                                    Sign in here
                                </Link>
                            </p>
                        </div>
                    </CardBody>
                </Card>

                <div className="register-decoration">
                    <div className="decoration-square square-1"></div>
                    <div className="decoration-square square-2"></div>
                    <div className="decoration-square square-3"></div>
                </div>
            </div>
        </PageSection>
    );
};
