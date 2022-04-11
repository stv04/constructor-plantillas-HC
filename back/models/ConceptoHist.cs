using System.ComponentModel.DataAnnotations;

namespace back.models
{
    public class ConceptoHist
    {
       [Key]
       public int? NU_NUME_COHI { get; set;} 
       public string? CD_CODI_COHI { get; set;} 
       public string TX_TITULO_COHI { get; set;} 
       public int NU_TIPO_COHI { get; set;} 
       public string? TX_DATFIJO_COHI { get; set;} 
       public string? TX_DIAGNOS_COHI { get; set;} 
       public string? TX_TBLBASE_COHI { get; set;} 
       public string? TX_CODBASE_COHI { get; set;} 
       public string? TX_NOMBASE_COHI { get; set;} 
       public string? TX_TABLACT_COHI { get; set;} 
       public string? TX_CAMPACT_COHI { get; set;} 
       public string? TX_APLICTS_COHI { get; set;} 
       public string? TX_VERDATO_COHI { get; set;} 
       public string? TX_CONDBAS_COHI { get; set;} 
       public string? TX_CONDACT_COHI { get; set;} 
       public string? TX_GETCACT_COHI { get; set;} 
       public string? TX_EXPREG_COHI { get; set;} 
       public string? TX_EXPREG_EJEM_COHI { get; set;}
       public int? NU_AUTOCOLUMNA_COHI { get; set;} 
       public int? NU_DXSOLOCOD_COHI { get; set;} 
       public int? NU_AUTOFILA_CONC { get; set;} 
       public int? NU_PERM_PREGARGA { get; set;} 
    }

    public class RPlanConc
    {
        [Key]
        public int? AUTO_INC_RPC { get; set; }
        public int NU_NUME_PLHI_RPC { get; set; }
        public int? NU_NUME_COHI_RPC { get; set; }
        public int NU_NUME_GRHI_RPC { get; set; }
        public int NU_INGR_RPC { get; set; }
        public int NU_INDI_RPC { get; set; }
        public int NU_TOP_RPC { get; set; }
        public int NU_LEFT_RPC { get; set; }
        public int NU_HEIGHT_RPC { get; set; }
        public int NU_WIDTH_RPC { get; set; }
        public string? NU_PATH_FILE { get; set; }
        public int NU_VISIBLE_RPC { get; set; }
        public int NU_INDIDEP_RPC { get; set; }
        public string TX_HXCOLORLETRA_RPC { get; set; }
        public int NU_ROTULOTOTALANCHO_RPC { get; set; }
        public int NU_ALINEAROTULO_RPC { get; set; }
        public string? TX_IDGROP_RPC { get; set; }
        public int NU_TAMFUENTE_RPC { get; set; }
        public int NU_ROTULOPERPEN_RPC { get; set; }
        public int NU_ROTULOVISIBLE_RPC { get; set; }
        public int NU_NEGRILLA_RPC { get; set; }
        public int NU_ALINEAROTULOVERTICAL_RPC { get; set; }
        public string TX_COLORFONDO_RPC { get; set; }
        public string TX_HXCOLORROTULO_RPC { get; set; }
        public string? TX_NOMBRPT_RPC { get; set; }
        public string? TX_FORMRPT_RPC { get; set; }
        public int? NU_EDITA_RPC { get; set; }
        public string? TX_CAMPOSASOCIA_RPC { get; set; }
        public string? TX_KEYESTILO_RPC { get; set; }
        public int? NU_INVACTASO_RPC { get; set; }
        public string TX_ALINEAROTULO_RPC { get; set; }
        public int NU_ORDEN_COLDEP_RPC { get; set; }
        public int? ES_SEMA_RPC { get; set; }
        public string? TX_DESC_SEMA_RPC { get; set; }
        public string? TX_VALOR_SEMA_RPC { get; set; }
        public string? TX_RELA_SEMA_RPC { get; set; }
        public string? TX_COLOR_SEMA_RPC { get; set; }
    }
}