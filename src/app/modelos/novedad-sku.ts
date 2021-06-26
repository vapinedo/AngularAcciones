export class NovedadSku {

    DDP: number; //ID_DESPACHO_DTL_PRD
    CHL: number; //PRD_LVL_CHILD
    NUM: number; //PRD_LVL_NUMBER
    CEP: number;//ID_CONTROL_ENTREGA_PRD
    CDV: number; //CANT_DEVOL
    MDV: number; //MOTIVO_DEV
    CRR: number; //CANT_RP_RE
    CAR: number; //CAUS_RP_RE
    FRP: string ='';//FECHA_RE_RE
    CET: number; //CANT_ENTRE
    ISA: number; //ID_SUB_ALIST
    IDA: number; //ID_DET_ALIST



    constructor(novedad: any) {

        this.DDP = novedad.ID_DESPACHO_DTL_PRD;
        this.CHL = novedad.PRD_LVL_CHILD;
        this.NUM = novedad.SKU;
        this.MDV = novedad.MOTIVO_DEVOLVER;
        this.CEP = novedad.ID_CONTROL_ENTREGA_PRD;
        
        this.ISA = novedad.ID_SUB_ALIST;
        this.IDA = novedad.ID_DET_ALIST;

        if(novedad.FECHA_RE_RE!=null) {
            this.FRP= novedad.FECHA_RE_RE.format('DD/MM/YYYY')
        }

        if(novedad.CANTIDAD_REPROGRAMACION!=null && novedad.CANTIDAD_REPROGRAMACION>0){
            this.CRR = novedad.CANTIDAD_REPROGRAMACION;
        }else if(novedad.CANTIDAD_REENVIO!=null && novedad.CANTIDAD_REENVIO>0){
            this.CRR = novedad.CANTIDAD_REENVIO;
        }  
        else{
            this.CRR=0;
        }    

        if(novedad.CAUSAL_REPROGRAMACION!=null){
            this.CAR = novedad.CAUSAL_REPROGRAMACION;
        }else{
            this.CAR = novedad.CAUSAL_REENVIO;
        }

        this.CET = novedad.CANTIDAD_ENTREGADA;
        this.CDV = novedad.CANTIDAD_DEVOLVER;
    }
    
}