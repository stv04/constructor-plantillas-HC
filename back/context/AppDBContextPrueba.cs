using back.models;
using Microsoft.EntityFrameworkCore;

namespace back.context
{
    public class AppDBContextPrueba : DbContext
    {
        public AppDBContextPrueba(DbContextOptions<AppDBContextPrueba> options) : base(options)
        {}

        public DbSet<GrupoHist> GRUPO_HIST {get; set;} 
        public DbSet<RPlanGrup> R_PLAN_GRUP {get; set;}
        public DbSet<ConceptoHist> CONCEPTO_HIST {get; set;}
        public DbSet<RPlanConc> R_PLAN_CONC {get; set;}
        public DbSet<PlantillaHist> PLANTILLA_HIST {get; set;} 
        public DbSet<FinalidadHist> FINALIDAD_HIST {get; set;}
        public DbSet<RPlantillaHist> R_PLANTILLA_HIST {get; set;}
        public DbSet<ListaOpcionesConceptos> LISTA_OPCION {get; set;}
        public DbSet<TemporalParametrizador> TEMPORAL_PARAMETRIZADOR {get; set;}

    }
}