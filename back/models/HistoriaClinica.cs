using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace back.models
{
    public class HistoriaClinica
    {
        [Key]
        public int? NU_IDHISTORIACLINICA_HC { get; set; }
	    public int NU_IDAFILIADO_HC { get; set; }
	    public int NU_IDFORMULARIO_HC { get; set; }
	    public string FE_FECHA_HC { get; set; }

        public int NU_IDLABORATORIO_HC { get; set; }
        public int NU_IDESPMEDICO_HC { get; set; }
        public int NU_IDMEDICO_HC { get; set; }
        public int NU_ESTADO_HC { get; set; }

        [Column(TypeName = "CLOB")]
	    public string TX_RESPUESTA_HC { get; set; }

    }

    public class HISTCLIN_X_DOCEXT
    {
        [Key]
        public int NU_IDHCXDC_HCXDE { get; set; }
        public int? NU_IDHISTORIACLINICA_HCXDE { get; set; }
        public int? NU_IDDOCEXTERNO_HCXDE { get; set; }

        [Column(TypeName = "CLOB")]
        public string? TX_INFODILIGENCIADA_HCXDE { get; set; }
        public int? NU_ESTADO_HCXDE { get; set; }
    }

    public class ListaOpcionesConceptos
    {
        [Key]
        public int ID_AUTO_OPCIO {get; set;}
        public string CD_CODI_OPCI {get; set;} = null!;
        public string TX_DESC_OPCI {get; set;} = null!;
        public string TX_GRUP_OPCI {get; set;} = null!;
    }
}