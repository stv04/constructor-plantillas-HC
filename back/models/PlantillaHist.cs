using System.ComponentModel.DataAnnotations;

namespace back.models
{
    public class PlantillaHist
    {
        [Key]
        public int NU_NUME_PLHI { get; set; }
        public string NU_ESTA_PLHI { get; set; }
        public string NU_TIAT_PLHI { get; set; }
        public string NU_ORIENTAPAG_PLHI { get; set; }
        public string? CD_CODI_ESP_PLHI { get; set; }

        public int NU_PERMADJARCHIVO_PLHI { get; set; }
        public int? NU_AUTO_ENPL_PLHI { get; set; }
        public int? NU_HEIGHT_PLHI { get; set; }
        public int? NU_PADRE_HIST { get; set; }
        public int? NU_PERPRINT_PLHI { get; set; }
        public int? NU_ESODOEVO_PLHI { get; set; }
        public int? ES_PSICOACTIVO { get; set; }
        public int? ES_CONTRAREFERENCIA { get; set; }
    }

    public class FinalidadHist
    {
        [Key]
        public int CD_CODI_FIN { get; set; }
        public string CD_NOMB_FIN { get; set; }
    }
}