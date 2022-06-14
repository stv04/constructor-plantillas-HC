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

            return Ok(historiaClinica);
        } catch {
            return BadRequest("Directo al catch");
        }
    }

    [HttpGet("ObtenerHcPorDocExtDeAfiliado/{idAfiliado}")]
    public IActionResult GetHcPorDocExtAfil(int idAfiliado, int? idDocumentoExterno) 
    {
        try
        {
            if(idDocumentoExterno == null) return BadRequest("Recuerda el id del documento externo a consultar.");

            List<int?> idsHistoraiClinica = (from Hc in context.HISTORIA_CLINICA
            where Hc.NU_IDAFILIADO_HC == idAfiliado
            select Hc.NU_IDHISTORIACLINICA_HC).ToList();

            List<HISTCLIN_X_DOCEXT> docAsociadosHC = new();

            idsHistoraiClinica.ForEach(idHistoraClinica => {
                Console.WriteLine(idHistoraClinica);
                List<HISTCLIN_X_DOCEXT> docExtPorHist = (from HcDe in context.HISTCLIN_X_DOCEXT
                where HcDe.NU_IDHISTORIACLINICA_HCXDE == idHistoraClinica
                && HcDe.NU_IDDOCEXTERNO_HCXDE == idDocumentoExterno
                select HcDe).ToList();

                docAsociadosHC.AddRange(docExtPorHist);
            });

            return Ok(docAsociadosHC);
        }
        catch
        {
            return BadRequest("Esto está mal");
        }
    }

    [HttpPost("HcPorDocExt")]
    public async Task<IActionResult> Post([FromBody] HISTCLIN_X_DOCEXT laHCXDE)
    {
        try
        {
            if (laHCXDE != null)
            {
                await context.HISTCLIN_X_DOCEXT.AddAsync(laHCXDE);
                await context.SaveChangesAsync();
                return Ok("Listo");
            }
            else
            {
                return NoContent();
            }
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }
}