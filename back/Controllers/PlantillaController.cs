using Microsoft.AspNetCore.Mvc;
using Oracle.ManagedDataAccess.Client;

namespace back.Controllers;

[ApiController]
[Route("[controller]")]
public class PlantillaController : ControllerBase
{
    private readonly ILogger<PlantillaController> _logger;
    OracleConnection conexion = new OracleConnection("user id=HIMSCAP;password=ITTASA2017;data source=" + 
     "(DESCRIPTION=(ADDRESS=(PROTOCOL=tcp)" + 
     "(HOST=181.129.245.90)(PORT=1521))(CONNECT_DATA="+
     "(SERVICE_NAME=PROYECTOS)))");

    public PlantillaController(ILogger<PlantillaController> logger)
    {
        _logger = logger;
    }

    [HttpGet(Name = "getPlantillas")]
    public IActionResult Get()
    {
        // conexion.Open();
        // OracleCommand comando = new OracleCommand("select top 1  * from grupo_hist");
        // OracleDataReader lector = comando.ExecuteReader();

        OracleCommand comando = conexion.CreateCommand();

        conexion.Open();
        comando.BindByName = true;
        comando.CommandText = "select * from grupo_hist FETCH FIRST 10 ROWS ONLY";

        OracleDataReader lector = comando.ExecuteReader();

        while(lector.Read())
        {
            Console.WriteLine("Prueba => " + lector["TX_TITULO_GRHI"]);
        }

        // lector.Dispose();
        return Ok("En revisión");
    }
}