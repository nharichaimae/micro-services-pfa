using Microsoft.AspNetCore.Mvc;
using pfa__.net.DTO;
using pfa__.net.Mapper;
using pfa__.net.Repositories;

namespace pfa__.net.Controllers
{
    [ApiController]
    [Route("api")]
    public class PieceController : ControllerBase
    {
        private readonly IPieceRepository _pieceRepository;

        public PieceController(IPieceRepository pieceRepository)
        {
            _pieceRepository = pieceRepository;
        }

        [HttpPost("piece")]
        public async Task<IActionResult> AddPiece([FromBody] AddPieceDto dto)
        {
            try
            {
                var userId = (int?)HttpContext.Items["UserId"];
                if (userId == null)
                    return Unauthorized(new { message = "JWT invalide ou manquant" });

                var piece = PieceMapper.ToPiece(dto, userId.Value);
                int newPieceId = await _pieceRepository.AddPieceAsync(piece);

                return Ok(new { message = "Pièce ajoutée", pieceId = piece.Id_Piece });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpGet("pieces")]
        public async Task<IActionResult> GetPiecesByUser()
        {
            try
            {
                var userId = (int?)HttpContext.Items["UserId"];
                if (userId == null)
                    return Unauthorized(new { message = "JWT invalide ou manquant" });

                var pieces = await _pieceRepository.ListerPiece(userId.Value);

                var piecesDto = pieces
                    .Select(p => PieceMapper.ToDto(p))
                    .ToList();

                return Ok(piecesDto);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpDelete("piece/{id}")]
        public async Task<IActionResult> SupprimerPiece(int id)
        {
            try
            {
                var userId = (int?)HttpContext.Items["UserId"];
                if (userId == null)
                    return Unauthorized(new { message = "JWT invalide ou manquant" });

                var result = await _pieceRepository.SupprimerPieceAsync(id);

                if (!result)
                    return NotFound(new { message = "Pièce non trouvée" });

                return Ok(new { message = "Pièce supprimée avec succès" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Erreur serveur", error = ex.Message });
            }
        }
    }
}
