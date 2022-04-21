using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using Oracle.ManagedDataAccess.Client;
using back.context;
using back.models;
using Microsoft.EntityFrameworkCore;

namespace back.Controllers;

[ApiController]
[Route("[controller]")]
public class FormulariosController : ControllerBase
{
    private readonly AppDBContext context;

    public FormulariosController(AppDBContext _context)
    {
        context = _context;
    }

    //INTERACIÓN CON LA PLANTILLA
    [HttpGet]
    public async Task<IActionResult> Get(int? id)
    {   
        try {
            if(id != null) {
                var x = await context.FORMULARIOS.FirstOrDefaultAsync(f => f.NU_IDFORMULARIO_FORM == id);
                return Ok(x);
            } else {
                var x = from Y in context.FORMULARIOS
                    orderby Y.NU_IDFORMULARIO_FORM descending
                    select new {
                        NU_IDFORMULARIO_FORM = Y.NU_IDFORMULARIO_FORM,
                        TX_NOMBREFORMULARIO_FORM = Y.TX_NOMBREFORMULARIO_FORM
                    };
                
                return Ok(x);
            }
        } catch {
            return BadRequest("Problemas :/");
        }
    }

    [HttpPost]
    public async Task<IActionResult> CreateForm([FromBody] Formulario formulario)
    {
        try {
            int? lastId = await context.FORMULARIOS.MaxAsync(f => f.NU_IDFORMULARIO_FORM);
            formulario.NU_IDFORMULARIO_FORM = lastId + 1;

            await context.FORMULARIOS.AddAsync(formulario);
            await context.SaveChangesAsync();

            return Ok("Formulario agregado");
        } catch {
            return BadRequest("Directo al catch");
        }
    }
}