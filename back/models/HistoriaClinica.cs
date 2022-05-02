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
}