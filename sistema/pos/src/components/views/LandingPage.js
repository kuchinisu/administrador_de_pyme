import { connect } from "react-redux"
import { Link } from "react-router-dom"

function LandingPage () {
    return (
        <div data-theme="cupcake">

            {/**navbar */}
            <div>
                <div className="navbar bg-base-100">
                    <div className="flex-1">
                        <a className="btn btn-ghost text-xl">daisyUI</a>
                    </div>

                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                            <img alt="Tailwind CSS Navbar component" src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                            </div>
                        </div>
                        <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                            <li>
                            <a className="justify-between">
                                Profile
                                <span className="badge">New</span>
                            </a>
                            </li>
                            <li><a>Settings</a></li>
                            <li><a>Logout</a></li>
                        </ul>
                    </div>

                    <div className="flex-none">
                        <ul className="menu menu-horizontal px-1">
                        <li><a>Link</a></li>
                        <li>
                            <details>
                            <summary>
                                Parent
                            </summary>
                            <ul className="p-2 bg-base-100 rounded-t-none">
                                <li><a>Link 1</a></li>
                                <li><a>Link 2</a></li>
                            </ul>
                            </details>
                        </li>
                        </ul>
                    </div>
                </div>
            </div>
        
            {/**cuerpo */}

            <div>
    <div className="divider"></div>

    <div className="flex justify-center items-center">
        <div className="card w-96 bg-base-100 shadow-xl image-full rounded-lg m-4 w-5/12">
            <figure><img src="http://127.0.0.1:8000/static/img/pos-fondo.jpg" alt="Shoes" /></figure>
            <div className="card-body">
                <h1 className="card-title text-6xl">Caja</h1>
                <p className="text-4xl">Sistema de cobro, corte, precios</p>
                <div className="card-actions justify-end">
                    <Link to={"/administracion/cajera"}>
                        <button className="btn btn-primary">Empezar</button>
                    </Link>
                </div>
            </div>
        </div>

        <div className="divider divider-horizontal"></div>

        <div className="card w-96 bg-base-100 shadow-xl image-full rounded-lg m-4 w-5/12 shadow-2xl">
            <figure><img src="http://127.0.0.1:8000/static/img/finanzas-fondo.jpg" alt="Shoes" /></figure>
            <div className="card-body">
                <h2 className="card-title text-6xl">Finanzas</h2>
                <p className="text-3xl">Dash board, historial de ganancias, ventas, gastos y reportes</p>
                <div className="card-actions justify-end">
                    <Link to={"/administracion/dashboard"}>
                        <button className="btn btn-primary">Empezar</button>
                    </Link>
                    
                </div>
            </div>
        </div>
    </div>

    <div className="divider"></div>

    <div className="flex justify-center items-center">
        <div className="card w-96 bg-base-100 shadow-xl image-full rounded-lg m-4 w-5/12">
            <figure><img src="http://127.0.0.1:8000/static/img/inventario-fondo.jpg" alt="Shoes" /></figure>
            <div className="card-body">
                <h2 className="card-title text-6xl">Inventario</h2>
                <p className="text-3xl">Administración, registrar, eliminar, productos, marcas y categorías</p>
                <div className="card-actions justify-end">
                    <Link to={"/administracion/inventario"}>
                        <button className="btn btn-primary">Empezar</button>
                    </Link>
                </div>
            </div>
        </div>

        <div className="divider divider-horizontal"></div>

        <div className="card w-96 bg-base-100 shadow-xl image-full rounded-lg m-4 w-5/12">
            <figure><img src="http://127.0.0.1:8000/static/img/humanos-fondo.jpg" alt="Shoes" /></figure>
            <div className="card-body">
                <h2 className="card-title text-6xl">Humanos</h2>
                <p className="text-3xl">Registro, administración y consulta de datos de los trabajadores</p>
                <div className="card-actions justify-end">
                    <Link to={"/administracion/rh"}> 
                        <button className="btn btn-primary">Empezar</button>
                    </Link>
                </div>
            </div>
        </div>
    </div>
</div>

            
            {/**footer */}
            <div>

            <footer className="footer p-10 bg-base-300 text-base-content" style={{marginTop: "30px"}}>
                <nav>
                    <h6 className="footer-title">Services</h6> 
                    <a className="link link-hover">Branding</a>
                    <a className="link link-hover">Design</a>
                    <a className="link link-hover">Marketing</a>
                    <a className="link link-hover">Advertisement</a>
                </nav> 
                <nav>
                    <h6 className="footer-title">Company</h6> 
                    <a className="link link-hover">About us</a>
                    <a className="link link-hover">Contact</a>
                    <a className="link link-hover">Jobs</a>
                    <a className="link link-hover">Press kit</a>
                </nav> 
                <nav>
                    <h6 className="footer-title">Social</h6> 
                    <div className="grid grid-flow-col gap-4">
                    <a><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path></svg></a>
                    <a><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path></svg></a>
                    <a><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path></svg></a>
                    </div>
                </nav>
            </footer>

            </div>
            {/**fin del footer */}

        </div>
    )
}


const mapStateToProps = state => ({

})

export default connect(mapStateToProps,{
    
})(LandingPage)
