import { FncStoreProcedureTag } from "../modelos/FncStoreProcedureTag.model";
import { GetDataObjectModel } from "../modelos/GetDataObjectModel.model";
import { RespuestaApi } from "../modelos/RespuestaApi.model";

export interface InterfazGenerica {
    /**
     * Se ejecuta para procedimientos que devuelven un cursor
     * @param objetoProcedimiento Objeto JSON con formato para request GetObjectTag
     * @returns RespuestaApi Objeto respuesta generico de Api Acceso a Datos
     */
    procesaDatosBloqueAnonimoDt(objetoProcedimiento: FncStoreProcedureTag): Promise<RespuestaApi>;

    /**
     * Se ejecuta para procedimientos que solo devuelven una variable tipo entero
     * @param objetoProcedimiento Objeto JSON con formato para request GetObjectTag
     * @returns RespuestaApi Objeto respuesta generico de Api Acceso a Datos
     */
    procesaDatosBloqueAnonimo32(objetoProcedimiento: FncStoreProcedureTag): Promise<RespuestaApi>;


    /**
     * @param objetoProcedimiento Objeto JSON con formato para request GetObjectTag
     * @returns RespuestaApi Objeto respuesta generico de Api Acceso a Datos
     */
    obtenerDatosCursor(objetoObtener: GetDataObjectModel): Promise<RespuestaApi>;
}