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

            return Ok(formulario);
        } catch {
            return BadRequest("Directo al catch");
        }
    }

    [HttpGet("documentosExternos")]
    public async Task<IActionResult> GetDocumentosExternos(int? id) {
        try {
            if(id != null) {
                var x = await context.DOCUMENTOS_EXTERNOS.FirstOrDefaultAsync(f => f.NU_IDDOCEXT_DOCEXT == id);
                return Ok(x);
            } else {
                var x = from Y in context.DOCUMENTOS_EXTERNOS
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

    [HttpPost("documentosExternos")]
    public async Task<IActionResult> CrearDocumentoExterno([FromBody] DocumentoExterno nuevoDoc) 
    {
        try {
            int? lastId = await context.DOCUMENTOS_EXTERNOS.MaxAsync(f => f.NU_IDDOCEXT_DOCEXT);
            int? id = lastId != null ? lastId + 1 : 1;
            nuevoDoc.NU_IDDOCEXT_DOCEXT = id;

            await context.DOCUMENTOS_EXTERNOS.AddAsync(nuevoDoc);
            await context.SaveChangesAsync();


            return Ok("¡Documento creado!");
        } catch {
            return BadRequest("Se hizo lo mejor que se pudo");
        }
    }

    [HttpGet("relacionDocumento")]
    public async Task<IActionResult> GetRelacionDocumento(int id)
    {
        try {
            if(id == null) return BadRequest("Es necesario el id del formulario que estás consultando.");
            
            var x = from Y in context.DOCUMENTOS_X_FORMULARIO
                where Y.NU_IDFORMULARIO_FORMXDOC == id
                select Y;

            return Ok(x);
        } catch {
            return BadRequest("lo siento, no hay nada :'(");
        }
    }

    [HttpPost("relacionarDocumento")]
    public async Task<IActionResult> RelacionarDocumento([FromBody] DocumentosPorFormulario relacion) 
    {
        try {
            int? lastId = await context.DOCUMENTOS_X_FORMULARIO.MaxAsync(f => f.NU_IDFORMXDOCUMENTO_FORMXDOC);
            int? id = lastId != null ? lastId + 1 : 1;
            relacion.NU_IDFORMXDOCUMENTO_FORMXDOC = id;

            await context.DOCUMENTOS_X_FORMULARIO.AddAsync(relacion);
            await context.SaveChangesAsync();


            return Ok("¡Relación agregada correctamente!");
        } catch {
            return BadRequest("Se hizo lo mejor que se pudo");
        }
    }
}