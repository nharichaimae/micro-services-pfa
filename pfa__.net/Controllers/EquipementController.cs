using Microsoft.AspNetCore.Mvc;
using pfa__.net.DTO;
using pfa__.net.Helpers;
using pfa__.net.Mapper;
using pfa__.net.Repositories;

namespace pfa__.net.Controllers
{
    [ApiController]
    [Route("api")]
    public class EquipementController : ControllerBase
    {
        private readonly IEquipementRepository _equipementRepository;

        public EquipementController(IEquipementRepository equipementRepository)
        {
            _equipementRepository = equipementRepository;
        }

        // Ajouter un équipement pour une pièce spécifique
        [HttpPost("piece/{pieceId}/equipement")]
        public async Task<IActionResult> AddEquipement(int pieceId, [FromBody] AddEquipementDto dto)
        {
            var equipement = EquipementMapper.ToEquipement(dto);

            equipement.Id_Piece = pieceId;
            int newEquipementId = await _equipementRepository.AddEquipementAsync(equipement);

            return Ok(new
            {
                message = "Équipement ajouté",
                equipementId = newEquipementId,
                pieceId = pieceId
            });
        }
        [HttpDelete("equipement/{id}")]
        public async Task<IActionResult> SupprimerEquipe(int id)
        {
          
                

                var result = await _equipementRepository
                    .SupprimerEquipementAsync(id);

                if (!result)
                    return NotFound(new { message = "Equipement non trouvé" });

                return NoContent(); 
    
        }
    }
}

