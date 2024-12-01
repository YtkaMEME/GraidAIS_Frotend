import {useRouter} from "next/navigation";

export default function NavBar ({title, handleDragnDropToggle, isDragnDropOpen}) {
    const router = useRouter();
    const handleLogout = () => {
        localStorage.removeItem('token');
        router.push('/login');
    };

    return (
        <>
            <div className={"container mt-3"}>
                <header className={"d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom"}>
                    <a href="/"
                       className={"d-flex align-items-center mb-3 mb-md-0 me-md-auto text-dark text-decoration-none"}>
                        <svg className={"bi me-2"} width="40" height="32">

                        </svg>
                        <span className={"fs-4"}>{title}</span>
                    </a>

                    <ul className={"nav nav-pills"}>
                        <li className={"nav-item"}>
                            <button type="button"
                                    className={isDragnDropOpen?"btn btn-outline-primary me-2" : "btn btn-primary me-2"}
                                    onClick={isDragnDropOpen? handleDragnDropToggle : ()=>{}}
                            >Главная страница
                            </button>
                        </li>
                        <li className={"nav-item"}>
                            <button type="button" onClick={!isDragnDropOpen? handleDragnDropToggle : ()=>{}}
                                    className={!isDragnDropOpen?"btn btn-outline-primary me-2" : "btn btn-primary me-2"}> Обновление базы данных
                            </button>
                        </li>
                        <li className={"nav-item"}>
                            <button type="button" onClick={handleLogout}
                                    className={"btn btn-outline-danger me-2"}>Выход
                            </button>
                        </li>
                    </ul>
                </header>
            </div>
        </>
    );
};
