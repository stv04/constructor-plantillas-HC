using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using Oracle.ManagedDataAccess.Client;
using back.context;
using back.models;
using Microsoft.EntityFrameworkCore;

namespace back.Controllers;

[ApiController]
[Route("[controller]")]
public class PlantillaAdherenciaController : ControllerBase
{
    private readonly AppDBContextPrueba context;

    public PlantillaAdherenciaController(AppDBContextPrueba _context)
    {
        this.context = _context;
    }

    //INTERACIÓN CON LA PLANTILLA
    [HttpPost("relPlatillaHist")]
    public async Task<IActionResult> createRPlantillaHist([FromBody] RPlantillaHist relacionPlantillaHist)
    {
        try {
            int? lastId = await context.R_PLANTILLA_HIST.MaxAsync(f => f.NU_PLANTLLA_R);
            relacionPlantillaHist.NU_PLANTLLA_R = lastId + 1;

            relacionPlantillaHist.NU_CGES_PLHI = 0;
            relacionPlantillaHist.NU_GECA_PLHI = 0;
            relacionPlantillaHist.NU_GENE_PLHI = 0;
            relacionPlantillaHist.NU_MODI_PLHI = 0;
            relacionPlantillaHist.NU_PRCO_PLHI = "C";
            relacionPlantillaHist.NU_REDF_PLHI = 150;
            relacionPlantillaHist.NU_REDI_PLHI = 0;
            relacionPlantillaHist.NU_SERV_PLHI = " ";
            relacionPlantillaHist.NU_TIEDF_PLHI = 1;
            relacionPlantillaHist.NU_TIEDI_PLHI = 1;
            relacionPlantillaHist.NU_VICA_PLHI = 1;

            await context.R_PLANTILLA_HIST.AddAsync(relacionPlantillaHist);
            await context.SaveChangesAsync();
            return Ok(relacionPlantillaHist);
        } catch {
            return BadRequest("Problemas :/");
        }
    }

    [HttpPost("setFinalidad")]
    public async Task<IActionResult> AddFinalidad([FromForm] FinalidadHist finalidad)
    {
        try {
            // Console.WriteLine(finalidad);
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
            
            plantilla.NU_AUTO_ENPL_PLHI = 1;
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

    //INTERACCIÓN CON LOS CONCEPTOS    
    [HttpGet("getConceptos")]
    public async Task<List<ConceptoHist>> GetConceptos()
    { 
        return await context.CONCEPTO_HIST.Take(10).ToListAsync();
    }

    [HttpPost("createRelConcepto")]
    public async Task<IActionResult> createRPlanConc([FromBody] RPlanConc relacionConcepto) {
        try {
            int? lastId = await context.R_PLAN_CONC.MaxAsync(f => f.AUTO_INC_RPC);
            relacionConcepto.AUTO_INC_RPC = lastId + 1;

            relacionConcepto.NU_INVACTASO_RPC = 0;
            await context.R_PLAN_CONC.AddAsync(relacionConcepto);
            await context.SaveChangesAsync();

            return Ok(relacionConcepto);
        } catch {
            return BadRequest("Nada");
        }
    }

    [HttpPost("createConcepto")]
    public async Task<IActionResult> createConcepto([FromForm] ConceptoHist nuevoConcepto)
    {
        try {
            int? lastId = await context.CONCEPTO_HIST.MaxAsync(f => f.NU_NUME_COHI);
            nuevoConcepto.NU_NUME_COHI = lastId + 1;

            nuevoConcepto.NU_AUTOCOLUMNA_COHI = 0;
            nuevoConcepto.NU_AUTOFILA_CONC = 0;
            nuevoConcepto.NU_DXSOLOCOD_COHI = 0;
            nuevoConcepto.NU_PERM_PREGARGA = 0;
            nuevoConcepto.TX_APLICTS_COHI = "T";
            nuevoConcepto.TX_CAMPACT_COHI = " ";
            nuevoConcepto.TX_CODBASE_COHI = " ";
            nuevoConcepto.TX_CONDACT_COHI = null;
            nuevoConcepto.TX_CONDBAS_COHI = null;
            nuevoConcepto.TX_DATFIJO_COHI = "N";
            nuevoConcepto.TX_DIAGNOS_COHI = "N";
            nuevoConcepto.TX_EXPREG_COHI = null;
            nuevoConcepto.TX_EXPREG_EJEM_COHI = null;
            nuevoConcepto.TX_GETCACT_COHI = "N";
            nuevoConcepto.TX_NOMBASE_COHI = " ";
            nuevoConcepto.TX_TABLACT_COHI = " ";
            nuevoConcepto.TX_TBLBASE_COHI = " ";
            nuevoConcepto.TX_VERDATO_COHI = "S";

            await context.CONCEPTO_HIST.AddAsync(nuevoConcepto);
            await context.SaveChangesAsync();
            return Ok(nuevoConcepto);
        } catch {
            return BadRequest("No se pudo crear concepto.");
        }  
    }

    [HttpPut("updateConcepto")]
    public async Task<IActionResult> updateConcepto([FromForm] ConceptoHist concepto)
    {
        try {
            var taked = await context.R_PLAN_CONC.FirstOrDefaultAsync(r => r.NU_NUME_COHI_RPC == concepto.NU_NUME_COHI);


            if(taked != null) return BadRequest("Este concepto ya esta siendo utilizado.");
            
            concepto.NU_AUTOCOLUMNA_COHI = 0;
            concepto.NU_AUTOFILA_CONC = 0;
            concepto.NU_DXSOLOCOD_COHI = 0;
            concepto.NU_PERM_PREGARGA = 0;
            concepto.TX_APLICTS_COHI = "T";
            concepto.TX_CAMPACT_COHI = " ";
            concepto.TX_CODBASE_COHI = " ";
            concepto.TX_CONDACT_COHI = null;
            concepto.TX_CONDBAS_COHI = null;
            concepto.TX_DATFIJO_COHI = "N";
            concepto.TX_DIAGNOS_COHI = "N";
            concepto.TX_EXPREG_COHI = null;
            concepto.TX_EXPREG_EJEM_COHI = null;
            concepto.TX_GETCACT_COHI = "N";
            concepto.TX_NOMBASE_COHI = " ";
            concepto.TX_TABLACT_COHI = " ";
            concepto.TX_TBLBASE_COHI = " ";
            concepto.TX_VERDATO_COHI = "S";

            context.CONCEPTO_HIST.Update(concepto);
            await context.SaveChangesAsync();
            return Ok(concepto);
        } catch {
            return BadRequest("No se pudo actualizar concepto");
        }
    }

    // interacción con los grupos
    [HttpGet("getGrupos")]
    public async Task<List<GrupoHist>> GetGrupos()
    { 
        return await context.GRUPO_HIST.OrderBy(g => g.NU_NUME_GRHI).Take(10).ToListAsync();
    }

    [HttpPost("createRelGrupo")]
    public async Task<IActionResult> CreateRPlanGrupo([FromBody] RPlanGrup relacionGrupo)
    {
        try {
            int? lastId = await context.R_PLAN_GRUP.MaxAsync(f => f.AUTO_INC_RPG);
            relacionGrupo.AUTO_INC_RPG = lastId + 1;
            await context.R_PLAN_GRUP.AddAsync(relacionGrupo);
            await context.SaveChangesAsync();

            return Ok(relacionGrupo);
        } catch {
            return BadRequest("Nada");
        }
    }

    [HttpPost("createGrupo")]
    public async Task<IActionResult> createGrupo([FromForm] GrupoHist nuevoGrupo)
    {
        try {
            int? lastId = await context.GRUPO_HIST.MaxAsync(f => f.NU_NUME_GRHI);
            nuevoGrupo.NU_NUME_GRHI = lastId + 1;

            await context.GRUPO_HIST.AddAsync(nuevoGrupo);
            await context.SaveChangesAsync();
            return Ok(nuevoGrupo);
        } catch {
            return BadRequest("No se pudo crear grupo");
        }
    }
    
    [HttpPut("updateGrupo")]
    public async Task<IActionResult> updateGrupo([FromForm] GrupoHist grupo)
    {
        try {
            var taked = await context.R_PLAN_GRUP.FirstOrDefaultAsync(r => r.NU_NUME_GRHI_RPG == grupo.NU_NUME_GRHI);

            if(taked != null) return BadRequest("Este grupo ya está siendo utilizado.");
            
            context.GRUPO_HIST.Update(grupo);
            await context.SaveChangesAsync();
            return Ok(grupo);
        } catch {
            return BadRequest("No se puede editar grupo");
        }
    }

}