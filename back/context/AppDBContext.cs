using back.models;
using Microsoft.EntityFrameworkCore;

namespace back.context
{
    public class AppDBContext : DbContext
    {
        public AppDBContext(DbContextOptions<AppDBContext> options) : base(options)
        {}

        public DbSet<Formulario> FORMULARIOS {get; set;}
    }
}