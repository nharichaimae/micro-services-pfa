using Microsoft.EntityFrameworkCore;
using pfa__.net.Models;


namespace pfa__.net.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {
        }

        public DbSet<Piece> Pieces { get; set; }
        public DbSet<Equipement> Equipements { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Piece>()
                .HasMany(p => p.Equipements)
                .WithOne(e => e.Piece)
                .HasForeignKey(e => e.Id_Piece)
                .OnDelete(DeleteBehavior.Cascade);

        }
    }
}
