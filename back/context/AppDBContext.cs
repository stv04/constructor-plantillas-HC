using back.models;
using Microsoft.EntityFrameworkCore;

namespace back.context
{
    public class AppDBContext : DbContext
    {
        public AppDBContext(DbContextOptions<AppDBContext> options) : base(options)
        {}

        public DbSet<Formulario> FORMULARIOS {get; set;}
        public DbSet<HistoriaClinica> HISTORIA_CLINICA { get; set; }
        public DbSet<FomularioPorDocumento> FORMULARIO_X_DOCUMENTO {get; set;}
        public DbSet<DocumentoExterno> DOCUMENTO_EXTERNO {get; set;}

    }
}