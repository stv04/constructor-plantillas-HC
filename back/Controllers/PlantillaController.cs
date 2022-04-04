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
    private readonly AppDBContextPrueba context;

    public PlantillaController(AppDBContextPrueba _context)
    {
        this.context = _context;
    }

    [HttpGet("getGrupos")]
    public async Task<List<PlantillaHist>> GetGrupos()
    { 
        return await context.PLANTILLA_HIST.Take(10).ToListAsync();
    }

    [HttpPost("setFinalidad")]
    public async Task<IActionResult> AddFinalidad([FromForm] FinalidadHist finalidad)
    {
        try {
            int lastId = await context.FINALIDAD_HIST.MaxAsync(f => f.CD_CODI_FIN);
            finalidad.CD_CODI_FIN = lastId + 1;

            await context.FINALIDAD_HIST.AddAsync(finalidad);
            await context.SaveChangesAsync();

            return Ok(finalidad);
        } catch {
            return BadRequest("Hubo un error");
        }
    }

    [HttpPost]
    public async Task<IActionResult> AddPlantilla([FromForm] PlantillaHist plantilla)
    {
        try
        {
            int lastId = await context.PLANTILLA_HIST.MaxAsync(f => f.NU_NUME_PLHI);
            plantilla.NU_NUME_PLHI = lastId + 1;
            plantilla.CD_CODI_ESP_PLHI = "".PadRight(1);
            
            plantilla.NU_AUTO_ENPL_PLHI = 15;
            plantilla.NU_HEIGHT_PLHI = 8210; //Alto de la hoja
            plantilla.NU_PADRE_HIST = 0;
            plantilla.NU_PERPRINT_PLHI = 0;
            plantilla.NU_ESODOEVO_PLHI = 0;
            plantilla.ES_PSICOACTIVO = 0;
            plantilla.ES_CONTRAREFERENCIA = 0;

            await context.PLANTILLA_HIST.AddAsync(plantilla);
            await context.SaveChangesAsync();
            return Ok(plantilla);

        }
        catch (System.Exception ex)
        {
            
            return BadRequest(ex);
        }
    }
}