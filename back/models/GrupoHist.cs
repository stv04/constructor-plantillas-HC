using System.ComponentModel.DataAnnotations;

namespace back.models
{
    public class GrupoHist
    {
        [Key]
        public int NU_NUME_GRHI {get; set;}
        public string? CD_CODI_GRHI {get; set;}
        public string? TX_TITULO_GRHI {get; set;}
    }
}