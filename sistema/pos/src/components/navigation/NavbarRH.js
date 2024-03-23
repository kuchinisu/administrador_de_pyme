import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid';
import { get_areas_list } from '../../redux/actions/areas';

import { useSelector, useDispatch} from "react-redux";
import {  useEffect } from "react";


function NavbarRH () {


    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(get_areas_list());
    },[])

    const areasList = useSelector((state) => state.areas.areas_list);


    const cambiarFormulario = () => {
        const botonSubm = document.getElementById("botonSubm");
        const formularioDeSocio = document.getElementById("formulario_de_socio");
        const selectorHumano = document.getElementById("selector_humano");
        const formularioEmpleadao = document.getElementById("formulario_empleadao");

        formularioDeSocio.style.display = "none";
        formularioEmpleadao.style.display = "none";

        const seleccionado = selectorHumano.value;

        if(seleccionado === "socia/o") {
            formularioDeSocio.style.display = "block";
            botonSubm.onclick = addSocio
        }else if(seleccionado ==="empleada/o") {
            formularioEmpleadao.style.display = "block";
            botonSubm.onclick = addEmpleade
        }
        
    }

    const addSocio = () => {

    }

    const addEmpleade = () => {
        const nombre = document.getElementById("nombre-empleadao");
        const edad = document.getElementById("edad-empleadao");
        const sexo = document.getElementById("selector_sexo");
        const fechaDeNacimiento = document.getElementById("fecha-de-nacimiento");
        const fechaDeEntrada = document.getElementById("fecha-de-entrada");
        const puesto = document.getElementById("puesto");
        const salario = document.getElementById("salario");
        const codigo = document.getElementById("codigo-empl");
        const area = document.getElementById("selector-area");

        const data = {
            nombre: nombre.value,
            edad: edad.value,
            sexo: sexo.value,
            cumple: fechaDeNacimiento.value,
            fecha_de_entrada: fechaDeEntrada.value,
            dias_trabajados: 0,
            puesto: puesto.value,
            salario: salario.value,
            codigo: codigo.value,
            area: area.value,


        }

        fetch('http://127.0.0.1:8000/administracion/add_empleade/', { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Respuesta del servidor:', data);
        })
        .catch(error => {
            console.error('Error al realizar la solicitud:', error);
        });
    }

    return ( 
        <div data-theme="cupcake" className="navbar bg-base-100">
            <div className="navbar-start">
                <div className="dropdown">
                <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                </div>
                <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                    <li><a>Item 1</a></li>
                    <li>
                    <a>Parent</a>
                    <ul className="p-2">
                        <li><a>Submenu 1</a></li>
                        <li><a>Submenu 2</a></li>
                    </ul>
                    </li>
                    <li><a>Item 3</a></li>
                </ul>
                </div>
                <a className="btn btn-ghost text-xl">daisyUI</a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                <li><a>Item 1</a></li>
                <li>
                    <details>
                    <summary>Parent</summary>
                    <ul className="p-2">
                        <li><a>Submenu 1</a></li>
                        <li><a>Submenu 2</a></li>
                    </ul>
                    </details>
                </li>
                <li><a>Item 3</a></li>
                </ul>
            </div>
            <div className="navbar-end">
            <label htmlFor="my_modal_6" className="btn">añadir</label></div>            

            <input type="checkbox" id="my_modal_6" className="modal-toggle" />
            <div className="modal" role="dialog">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Formulario</h3> 
                    <p className="py-4">registro de socia/o o empleada/o</p>
                    <div className="modal-action">
                    <select id='selector_humano' onChangeCapture={cambiarFormulario} className="select select-primary w-full max-w-xs">
                                            <option disabled selected>tipo de personal</option>
                                            <option>socia/o</option>
                                            <option>empleada/o</option>
                                        </select>
                    <label id="botonSubm" htmlFor="my_modal_6" className="btn">guardar</label>
                    </div>

                    <div id="formulario_de_socio">
                        <form>
                            <div className="space-y-12">
                                <div className="border-b border-gray-900/10 pb-12">
                                <h2 className="text-base font-semibold leading-7 text-gray-900">Profile</h2>
                                <p className="mt-1 text-sm leading-6 text-gray-600">
                                    This information will be displayed publicly so be careful what you share.
                                </p>

                                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                    <div className="sm:col-span-4">
                                        
                                        <div className="sm:col-span-3">
                                            <label htmlFor="nombre" className="block text-sm font-medium leading-6 text-gray-900">
                                                Nombre
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                type="text"
                                                name="nombre"
                                                id="nombre"
                                                autoComplete="given-name"
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />
                                            </div>
                                        </div>
                                    </div>


                                    <div className="sm:col-span-3">
                                        <label htmlFor="aportacion-de-entrada" className="block text-sm font-medium leading-6 text-gray-900">
                                            Aportacion de entrada
                                        </label>
                                        <div className="mt-2">
                                            <input
                                            type="text"
                                            name="aportacion-de-entrada"
                                            id="aportacion-de-entrada"
                                            autoComplete="given-name"
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>


                                    <div className="sm:col-span-3">
                                        <label htmlFor="porcentaje-correspondido" className="block text-sm font-medium leading-6 text-gray-900">
                                            Porsentaje correspondido
                                        </label>
                                        <div className="mt-2">
                                            <input
                                            type="text"
                                            name="porcentaje-correspondido"
                                            id="porcentaje-correspondido"
                                            autoComplete="given-name"
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>

                                    <label htmlFor="codigo-de-empleado" className="block text-sm font-medium leading-6 text-gray-900">
                                            codigo
                                        </label>
                                        <div className="mt-2">
                                            <input
                                            type="text"
                                            name="codigo-de-empleado"
                                            id="codigo-de-empleado"
                                            autoComplete="given-name"
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>



                                    <div className="col-span-full">
                                    
                                    <p className="mt-3 text-sm leading-6 text-gray-600">Write a few sentences about yourself.</p>
                                    </div>

                                    <div className="col-span-full">
                                    <label htmlFor="photo" className="block text-sm font-medium leading-6 text-gray-900">
                                        Photo
                                    </label>
                                    <div className="mt-2 flex items-center gap-x-3">
                                        <UserCircleIcon className="h-12 w-12 text-gray-300" aria-hidden="true" />
                                        <button
                                        type="button"
                                        className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                                        >
                                        Change
                                        </button>
                                    </div>
                                    </div>

                                    <div className="col-span-full">
                                    <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-900">
                                        Cover photo
                                    </label>
                                    <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                                        <div className="text-center">
                                        <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                                        <div className="mt-4 flex text-sm leading-6 text-gray-600">
                                            <label
                                            htmlFor="file-upload"
                                            className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                                            >
                                            <span>Upload a file</span>
                                            <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                                            </label>
                                            <p className="pl-1">or drag and drop</p>
                                        </div>
                                        <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                                </div>

                                
                            </div>
                            </form>
                    </div>

                    <div id='formulario_empleadao'>
                        <form>
                            <div className="space-y-12">
                                <div className="border-b border-gray-900/10 pb-12">
                                <h2 className="text-base font-semibold leading-7 text-gray-900">Perfil</h2>
                                <p className="mt-1 text-sm leading-6 text-gray-600">
                                    la informacion se guardará en la base de datos local y la base de datos online
                                </p>

                                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                <div className="sm:col-span-3">
                                        <label htmlFor="nombre-empleadao" className="block text-sm font-medium leading-6 text-gray-900">
                                            nombre
                                        </label>
                                        <div className="mt-2">
                                            <input
                                            type="text"
                                            name="nombre-empleadao"
                                            id="nombre-empleadao"
                                            autoComplete="given-name"
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                </div>
                                <div className="sm:col-span-3">
                                        <label htmlFor="edad-empleadao" className="block text-sm font-medium leading-6 text-gray-900">
                                            edad
                                        </label>
                                        <div className="mt-2">
                                            <input
                                            type="text"
                                            name="edad-empleadao"
                                            id="edad-empleadao"
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                </div>
                                

                                    <div className="col-span-full">
                                    
                                    <p className="mt-3 text-sm leading-6 text-gray-600">Write a few sentences about yourself.</p>
                                    
                                    </div>

                                    

                                    <div className="col-span-full">
                                    
                                    </div>
                                </div>
                                </div>

                                <div className="border-b border-gray-900/10 pb-12">
                                <h2 className="text-base font-semibold leading-7 text-gray-900">Personal Information</h2>
                                <p className="mt-1 text-sm leading-6 text-gray-600">Use a permanent address where you can receive mail.</p>

                                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                    <div className="sm:col-span-3">
                                    <select id='selector_sexo' className="select select-info w-full max-w-xs">
                                        <option disabled selected>Sexo</option>
                                        <option>sin especificar</option>
                                        <option>mujer</option>
                                        <option>hombre</option>
                                    </select>
                                    </div>

                                    <div className="sm:col-span-3">
                                    <label htmlFor="fecha-de-nacimiento" className="block text-sm font-medium leading-6 text-gray-900">
                                        fecha de nacimiento
                                    </label>
                                    <div className="mt-2">
                                        <input
                                        type="text"
                                        name="fecha-de-nacimiento"
                                        id="fecha-de-nacimiento"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                    </div>

                                    <div className="sm:col-span-4">
                                    <label htmlFor="fecha-de-entrada" className="block text-sm font-medium leading-6 text-gray-900">
                                        fecha de entrada
                                    </label>
                                    <div className="mt-2">
                                        <input
                                        id="fecha-de-entrada"
                                        name="fecha-de-entrada"
                                        type="text"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                    </div>

                                    <div className="sm:col-span-3">
                                    <label htmlFor="puesto" className="block text-sm font-medium leading-6 text-gray-900">
                                        Puesto
                                    </label>
                                    <div className="mt-2">
                                        <select
                                        id="puesto"
                                        name="puesto"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                        >
                                        <option>cajera</option>
                                        <option>velador</option>
                                        </select>
                                    </div>
                                    </div>

                                    

                                    <div className="sm:col-span-2 sm:col-start-1">
                                    <label htmlFor="salario" className="block text-sm font-medium leading-6 text-gray-900">
                                        salario
                                    </label>
                                    <div className="mt-2">
                                        <input
                                        type="text"
                                        name="salario"
                                        id="salario"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                    </div>

                                    <div className="sm:col-span-2 sm:col-start-1">
                                    <label htmlFor="codigo-empl" className="block text-sm font-medium leading-6 text-gray-900">
                                        codigo
                                    </label>
                                    <div className="mt-2">
                                        <input
                                        type="text"
                                        name="codigo-empl"
                                        id="codigo-empl"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                    </div>

                                    

                                </div>
                                        {areasList ? (
                                            <div>
                                                
                                                {areasList.map((item) => 
                                                    <select id='selector-area' className="select select-bordered w-full max-w-xs m-5">
                                                    <option disabled selected>area</option>
                                                    
                                                    <option>{item.nombre}</option>
                                                    </select>
                                                )}
                                            </div>
                                        ):

                                        (
                                            <div>
                                               no hay areas registradas
                                            </div>
                                        )}
                                    
                                </div>

                                
                            </div>

                            
                            </form>
                    </div>
                </div>
            </div>
            </div>

            
    )
}

export default NavbarRH