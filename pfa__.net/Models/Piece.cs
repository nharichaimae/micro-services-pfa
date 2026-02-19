using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace pfa__.net.Models
{
    [Table("piece")]
    public class Piece
    {
        [Key]
        public int Id_Piece { get; set; }

        [Required]
        [MaxLength(100)]
        public string Nom { get; set; }

        public int Id { get; set; }

        public ICollection<Equipement> Equipements { get; set; }
    }
}
