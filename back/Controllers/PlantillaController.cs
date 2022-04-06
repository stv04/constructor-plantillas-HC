using Microsoft.AspNetCore.Mvc;
using Oracle.ManagedDataAccess.Client;
using back.context;
using back.models;
using Microsoft.EntityFrameworkCore;

namespace back.Controllers;

[ApiController]
[Route("[controller]")]
public class PlantillaController : ControllerBase
{
    public readonly PlantillaAdjacencia context;
    public string getGrupos;

    public PlantillaController(PlantillaAdjacencia _context)
    {
        this.getGrupos = "getGrupos";
        this.context = _context;
    }

    [HttpGet(getGrupos)]
    public async Task<List<GrupoHist>> GetGrupos()
    { 
        return await context.GetGrupos();
    }
    
    // [HttpGet("getGruposMicros")]
    // public async Task<List<GrupoHist>> GetGruposMicros()
    // {
    //     return await microservice.GetGruposMicro();
    // }

    // public void HolaMundo()
    // {
    //     Console.WriteLine("Homa mundo");
    //     // GrupoHist get = this.getGrupos();
    //     // GrupoMicro get2 = this.getGruposMicro();
    // }

}