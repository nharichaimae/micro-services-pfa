using pfa__.net.DTO;
using pfa__.net.Models;

namespace pfa__.net.Mapper
{
    public static class PieceMapper
    {
        // Transformer AddPieceDto en Piece
        public static Piece ToPiece(AddPieceDto dto, int userId)
        {
            return new Piece
            {
                Nom = dto.name,
                Id = userId

            };
        }
        public static PieceReadDto ToDto(Piece piece)
        {
            return new PieceReadDto
            {
                Id = piece.Id_Piece,
                Nom = piece.Nom,
                Equipements = piece.Equipements?
                    .Select(e => EquipementMapper.ToDto(e))
                    .ToList() ?? new List<EquipementReadDto>()
            };
        }

    }
}