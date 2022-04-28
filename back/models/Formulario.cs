using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace back.models
{
    public class Formulario
    {
        [Key]
        public int? NU_IDFORMULARIO_FORM { get; set; }
	    public string TX_NOMBREFORMULARIO_FORM { get; set; }
        
        [Column(TypeName = "CLOB")]
	    public string TX_JSON_FORM { get; set; } 
        
        [Column(TypeName = "CLOB")]
	    public string TX_HTML_FORM { get; set; } 

        [Column(TypeName = "CLOB")]
	    public string TX_CSS_FORM { get; set; }

        [Column(TypeName = "CLOB")]
	    public string? TX_JS_FORM { get; set; }
    }

    public class FormularioConsulta {
        public int? NU_IDFORMULARIO_FORM {get; set;}
        public string TX_NOMBREFORMULARIO_FORM {get; set;}
    }
}