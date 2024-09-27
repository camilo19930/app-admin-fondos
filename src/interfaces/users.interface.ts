export interface UserInterface {
    id?: string
    name?: string
    email?: string
    telefono?: string
    fondo_actual?: FondoActual[]
    historico?: Historico[]
    password?: string
    saldo?: number
  }
  
  export interface FondoActual {
    idFondo: string
    nombreFondo: string
    fechaVinculación: string
    monto: number
    estado: boolean
    montoInicial: number
  }
  
  export interface Historico {
    idFondo: string
    nombreFondo: string
    fechaVinculación: string
    monto: number
    estado: boolean
    montoInicial: number
  }