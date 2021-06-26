import { environment } from 'src/environments/environment';
import { Configuracion } from '../modelos/Configuracion.model';


export class Constantes {

    private static instancia: Constantes;
    public configuracion!: Configuracion;
    public static obtenerInstancia(): Constantes {
        if (!Constantes.instancia) {
            Constantes.instancia = new Constantes();
        }
        return Constantes.instancia;
    }

    static readonly serviceUrl = `${environment.host}`;
    static readonly fncStoreProcedureTagDt = '/FncStoreProcedureTagDt';
    static readonly fncStoreProcedureTagInt32 = '/FncStoreProcedureTagInt32';
    static readonly getDtObjTag = '/GetDtObjTag';
    //readonly dinamicoConfiguracion = 'SLTALICONF';
    configuraciones!: Configuracion;

    readonly dinamicos = {
        GETTUSUARI: 'GETTUSUARI',
        //QUIEBCONFI: 'QUIEBCONFI',
        SLTCONFIG: 'SLTCONFIG',
        SLTDETNOVE: 'SLTDETNOVE',
        SLTMOTIVOS: 'SLTMOTIVOS',
        SLTENCNOVE:'SLTENCNOVE',
        GETQUIEMED: 'GETQUIEMED',
        SLTBUSCANP: 'SLTBUSCANP',
        GETDPRTMTO: 'GETDPRTMTO',
        GETCIDADPT: 'GETCIDADPT',
        JUNIGCONCF: 'JUNIGCONCF',
        SLTREPROGR: 'SLTREPROGR'
    };

    readonly paquetes = {
    }

    readonly procedimientos = {
    }

    setConfiguracion(configuracion: Configuracion) {
        this.configuraciones = configuracion;
    }

    

    getFncStoreProcedureTagDt() {
        if (this.configuraciones) {
            return `${environment.host}/${Constantes.fncStoreProcedureTagDt}`;
        }
        return `${environment.host}${Constantes.fncStoreProcedureTagDt}`;
    }

    getGetDtObjTag() {
        if (this.configuraciones) {
            return `${environment.host}/${Constantes.getDtObjTag}`;
        }
        return `${environment.host}${Constantes.getDtObjTag}`;
    }
    
}   