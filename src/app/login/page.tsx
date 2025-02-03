'use client';
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from '../../styles/Login.module.css';

// https://audiencerating.ru
export default function Page() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();
    let url = "audiencerating.ru"
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${url}/api/login`, {
                username,
                password
            });
            let data = JSON.parse(response.data);
            localStorage.setItem('token', data.token);
            router.push('/protected');
        } catch (error) {
            setError('Неверный логин или пароль');
        }
    };

    return (
        <section className={`${styles.section} `}>
            <div className={`container py-5 h-100`}>
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                        <div className={`card shadow-2-strong ${styles.card}`}>
                            <form className="card-body p-5 text-center " onSubmit={handleLogin}>
                                <h3 className="mb-5">Авторизация</h3>

                                <div className="form-outline mb-4">
                                    <input
                                        type="text"
                                        className="form-control form-control-lg"
                                        placeholder="Введите имя пользователя"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                    />
                                </div>

                                <div className="form-outline mb-4">
                                    <input
                                        type="password"
                                        id="typePasswordX-2"
                                        className="form-control form-control-lg"
                                        placeholder = "Введите пароль"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                                <button className={`btn btn-primary btn-lg mb-2 ${styles.fullWidth}`} type="submit">
                                    Войти
                                </button>
                                {error && <div className="alert alert-danger mt-3" role="alert">{error}</div>}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
