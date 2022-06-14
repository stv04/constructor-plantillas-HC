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
        public DbSet<DocumentosPorFormulario> DOCUMENTOS_X_FORMULARIO {get; set;}
        public DbSet<DocumentoExterno> DOCUMENTOS_EXTERNOS {get; set;}

        public DbSet<HISTCLIN_X_DOCEXT> HISTCLIN_X_DOCEXT {get; set;}

    }
}