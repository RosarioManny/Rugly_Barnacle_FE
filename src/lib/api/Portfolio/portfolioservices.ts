import api from '../apiConfig';

export interface PortfolioImage {
  title: string;
  image: string;
  is_visible: boolean;
  created_at?: string;
  thumbnail?: string;
}

// GET PORTFOLIO LIST IMAGES
export const getPortfolioImages = async (): Promise<PortfolioImage[]> => {
  try {
    const response = await api.get<PortfolioImage[]>('portfolio/');
    return response.data;

  } catch (err: any) {
    console.error("Error fetching portfolio images:", err.response?.data?.error || err.message);
    throw err;
  }
}

// MODEL
//  title = models.CharField(max_length=200, blank=True, help_text="Short description of the rug (e.g., 'Blue Geometric Pattern Rug')")
//     image = models.ImageField(
//         upload_to='portfolio/',
//         blank=True,
//         null=True, 
//         storage=MediaCloudinaryStorage(),
//         validators=[
//             FileExtensionValidator(
//                 allowed_extensions=['jpg', 'jpeg', 'png', 'webp']
//             )
//         ]
//     )
//     is_visible = models.BooleanField(default=True, help_text="Toggle to show this in the portfolio")
//     created_at = models.DateField(auto_now_add=True)
//     thumbnail = models.ImageField(upload_to='portfolio/thumbnails/', blank=True, null=True)
