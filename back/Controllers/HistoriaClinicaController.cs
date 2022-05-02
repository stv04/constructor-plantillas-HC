using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using Oracle.ManagedDataAccess.Client;
using back.context;
using back.models;
using Microsoft.EntityFrameworkCore;

namespace back.Controllers;

[ApiController]
[Route("[controller]")]
public class HistoriaClinicaController : ControllerBase
{
    private readonly AppDBContext context;

    public HistoriaClinicaController(AppDBContext _context)
    {
        context = _context;
    }

    //INTERACIÓN CON LA PLANTILLA
    [HttpGet]
    public async Task<IActionResult> Get(int? id)
    {   
        try {
            if(id != null) {
                var x = await context.HISTORIA_CLINICA.FirstOrDefaultAsync(f => f.NU_IDHISTORIACLINICA_HC == id);
                return Ok(x);
            } else {                
                return Ok("Perate que falta el id!");
            }
        } catch {
            return BadRequest("Problemas :/");
        }
    }

    [HttpPost]
    public async Task<IActionResult> CreateHistoriaClinica([FromBody] HistoriaClinica historiaClinica)
    {
        try {
            int? lastId = await context.HISTORIA_CLINICA.MaxAsync(f => f.NU_IDHISTORIACLINICA_HC);
            int? id = lastId + 1;
            Console.WriteLine("ULTIMO ID => ", id);
            if(lastId == null) id = 1;

            historiaClinica.NU_IDHISTORIACLINICA_HC = id;

            Console.WriteLine(historiaClinica.FE_FECHA_HC);

            await context.HISTORIA_CLINICA.AddAsync(historiaClinica);
            await context.SaveChangesAsync();

            return Ok("Historia clínica creada exitósamente");
        } catch {
            return BadRequest("Directo al catch");
        }
    }
}