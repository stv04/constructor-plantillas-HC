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

    [HttpGet("documentoExterno")]
    public async Task<IActionResult> GetDocumentosExternos(int? id) {
        try {
            if(id != null) {
                var x = await context.DOCUMENTO_EXTERNO.FirstOrDefaultAsync(f => f.NU_IDDOCEXT_DOCEXT == id);
                return Ok(x);
            } else {
                var x = from Y in context.DOCUMENTO_EXTERNO
                    orderby Y.NU_IDDOCEXT_DOCEXT descending
                    select new {
                        NU_IDDOCEXT_DOCEXT = Y.NU_IDDOCEXT_DOCEXT,
                        TX_NOMBREDOC_DOCEXT = Y.TX_NOMBREDOC_DOCEXT
                    };
                
                return Ok(x);
            }
        } catch {
            return BadRequest("Problemas :/");
        }
    }

    [HttpPost("documentoExterno")]
    public async Task<IActionResult> CrearDocumentoExterno([FromBody] DocumentoExterno nuevoDoc) 
    {
        try {
            int? lastId = await context.DOCUMENTO_EXTERNO.MaxAsync(f => f.NU_IDDOCEXT_DOCEXT);
            int? id = lastId != null ? lastId + 1 : 1;
            nuevoDoc.NU_IDDOCEXT_DOCEXT = id;

            await context.DOCUMENTO_EXTERNO.AddAsync(nuevoDoc);
            await context.SaveChangesAsync();


            return Ok("¡Documento creado!");
        } catch {
            return BadRequest("Se hizo lo mejor que se pudo");
        }
    }

    [HttpGet("relacionDocumento")]
    public async Task<IActionResult> GetRelacionDocumento()
    {
        return Ok("mi string");
    }

    [HttpPost("relacionarDocumento")]
    public async Task<IActionResult> RelacionarDocumento([FromBody] FomularioPorDocumento relacion) 
    {
        try {
            int? lastId = await context.FORMULARIO_X_DOCUMENTO.MaxAsync(f => f.NU_IDFORMXDOCUMENTO_FORMXDOC);
            int? id = lastId != null ? lastId + 1 : 1;
            relacion.NU_IDFORMXDOCUMENTO_FORMXDOC = id;

            await context.FORMULARIO_X_DOCUMENTO.AddAsync(relacion);
            await context.SaveChangesAsync();


            return Ok("¡Relación agregada correctamente!");
        } catch {
            return BadRequest("Se hizo lo mejor que se pudo");
        }
    }
}