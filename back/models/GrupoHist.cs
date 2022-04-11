using System.ComponentModel.DataAnnotations;

namespace back.models
{
    public class GrupoHist
    {
        [Key]
        public int? NU_NUME_GRHI {get; set;}
        public string? CD_CODI_GRHI {get; set;}
        public string? TX_TITULO_GRHI {get; set;}
    }

    public class RPlanGrup
    {
        [Key]
        public int? AUTO_INC_RPG {get; set;}
        public int NU_NUME_PLHI_RPG { get; set; }
        public int NU_NUME_GRHI_RPG { get; set; }
        public int NU_INDI_RPG { get; set; }
        public int NU_INGR_RPG { get; set; }
        public int NU_NUGR_RPG { get; set; }
        public int NU_TOP_RPG { get; set; }
        public int NU_LEFT_RPG { get; set; }
        public double NU_HEIGHT_RPG { get; set; }
        public double NU_WIDTH_RPG { get; set; }
        public string? TX_BORDES_RPG { get; set; }
        public string TX_HXCOLORROTULO_RPG { get; set; }
        public string TX_HXCOLORLETRA_RPG { get; set; }
        public int NU_ROTULOTOTALANCHO_RPG { get; set; }
        public int NU_ALINEAROTULO_RPG { get; set; }
        public int NU_TAMFUENTE_RPG { get; set; }
        public int NU_ROTULOPERPEN_RPG { get; set; }
        public int NU_ROTULOVISIBLE_RPG { get; set; }
        public int NU_NEGRILLA_RPG { get; set; }
        public int NU_ALINEAROTULOVERTICAL_RPG { get; set; }
        public string TX_COLORFONDO_RPG { get; set; }
        public int NU_ORDEN_COLDEP_RPG { get; set; }
        public int NU_INDIDEP_RPC_RPG { get; set; }
        public int NU_INVACTASO_RPG { get; set; }
        public string TX_ALINEAROTULO_RPG { get; set; }
    }
}