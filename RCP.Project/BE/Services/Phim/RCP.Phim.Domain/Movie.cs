using RCP.Shared.ApplicationService.Database;
using System.ComponentModel.DataAnnotations.Schema;

namespace RCP.Phim.Domain
{
    [Table(nameof(Movie), Schema = DbSchemas.Movie)]
    public class Movie
    {

    }
}
