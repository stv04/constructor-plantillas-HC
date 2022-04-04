using back.models;
using Microsoft.EntityFrameworkCore;

namespace back.context
{
    public class AppDBContextPrueba : DbContext
    {
        public AppDBContextPrueba(DbContextOptions<AppDBContextPrueba> options) : base(options)
        {}

        public DbSet<GrupoHist> GRUPO_HIST {get; set;} 
        public DbSet<PlantillaHist> PLANTILLA_HIST {get; set;} 
        public DbSet<FinalidadHist> FINALIDAD_HIST {get; set;} 
    }
}