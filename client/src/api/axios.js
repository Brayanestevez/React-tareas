import axios from "axios";

const instace = axios.create({//esto permite decirle a axios en el que siempre va consultar
    baseURL: 'http://localhost:3000/api',//en este caso, siempre se consulta en esta direccion, la direccion del back
    withCredentials: true//para que se establesca las cookies aqui
})

export default instace;