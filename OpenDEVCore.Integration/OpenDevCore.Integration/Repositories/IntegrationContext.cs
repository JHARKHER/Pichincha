using Core.Data;
using Microsoft.EntityFrameworkCore;
using OpenDEVCore.Integration.Entities;

namespace OpenDEVCore.Integration.Repositories
{
    public partial class IntegrationContext : CoreContext
    {

        public IntegrationContext(DbContextOptions<IntegrationContext> options) : base(options) { }

        public virtual DbSet<Movimiento> Movimiento { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {

            }
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("ProductVersion", "2.2.6-servicing-10079");

            modelBuilder.Entity<Movimiento>(entity =>
            {
                entity.HasKey(e => e.IdMovimiento)
                    .HasName("PK_MOVIMIENTO");

                entity.Property(e => e.Beneficiario)
                    .HasMaxLength(32)
                    .IsUnicode(false);

                entity.Property(e => e.Concepto)
                    .HasMaxLength(64)
                    .IsUnicode(false);

                entity.Property(e => e.EmailDestino)
                    .HasMaxLength(32)
                    .IsUnicode(false);

                entity.Property(e => e.Monto).HasColumnType("decimal(18, 0)");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);

    }
}
