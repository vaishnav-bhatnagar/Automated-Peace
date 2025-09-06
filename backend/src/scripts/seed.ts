import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// High-quality landscape images from Unsplash (free to use)
const seedImages = [
  {
    url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=1080&fit=crop&crop=center',
    thumb_url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop&crop=center',
    source: 'Unsplash',
    title: 'Mountain Lake Reflection',
    photographer: 'Sergey Pesterev',
    photographer_profile: 'https://unsplash.com/@sickle',
    alt_text: 'Serene mountain lake with perfect reflection of snow-capped peaks',
    width: 1920,
    height: 1080,
    tags: ['mountain', 'lake', 'reflection', 'nature', 'landscape']
  },
  {
    url: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1920&h=1080&fit=crop&crop=center',
    thumb_url: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300&fit=crop&crop=center',
    source: 'Unsplash',
    title: 'Forest Path',
    photographer: 'Casey Horner',
    photographer_profile: 'https://unsplash.com/@mischievous_penguins',
    alt_text: 'Sunlit forest path through tall trees',
    width: 1920,
    height: 1080,
    tags: ['forest', 'path', 'trees', 'sunlight', 'nature']
  },
  {
    url: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1920&h=1080&fit=crop&crop=center',
    thumb_url: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=300&fit=crop&crop=center',
    source: 'Unsplash',
    title: 'Coastal Cliffs',
    photographer: 'David Marcu',
    photographer_profile: 'https://unsplash.com/@davidmarcu',
    alt_text: 'Dramatic coastal cliffs overlooking the ocean',
    width: 1920,
    height: 1080,
    tags: ['coast', 'cliffs', 'ocean', 'dramatic', 'seascape']
  },
  {
    url: 'https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?w=1920&h=1080&fit=crop&crop=center',
    thumb_url: 'https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?w=400&h=300&fit=crop&crop=center',
    source: 'Unsplash',
    title: 'Desert Dunes',
    photographer: 'Sergey Pesterev',
    photographer_profile: 'https://unsplash.com/@sickle',
    alt_text: 'Golden sand dunes in desert landscape',
    width: 1920,
    height: 1080,
    tags: ['desert', 'dunes', 'sand', 'golden', 'arid']
  },
  {
    url: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=1920&h=1080&fit=crop&crop=center',
    thumb_url: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=400&h=300&fit=crop&crop=center',
    source: 'Unsplash',
    title: 'Alpine Meadow',
    photographer: 'Qingbao Meng',
    photographer_profile: 'https://unsplash.com/@qingbao',
    alt_text: 'Colorful wildflowers in alpine meadow with mountains',
    width: 1920,
    height: 1080,
    tags: ['alpine', 'meadow', 'wildflowers', 'mountains', 'colorful']
  },
  {
    url: 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=1920&h=1080&fit=crop&crop=center',
    thumb_url: 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=400&h=300&fit=crop&crop=center',
    source: 'Unsplash',
    title: 'Misty Forest',
    photographer: 'John Towner',
    photographer_profile: 'https://unsplash.com/@heytowner',
    alt_text: 'Misty forest with tall pine trees',
    width: 1920,
    height: 1080,
    tags: ['forest', 'mist', 'pine', 'atmospheric', 'moody']
  },
  {
    url: 'https://images.unsplash.com/photo-1501436513145-30f24e19fcc4?w=1920&h=1080&fit=crop&crop=center',
    thumb_url: 'https://images.unsplash.com/photo-1501436513145-30f24e19fcc4?w=400&h=300&fit=crop&crop=center',
    source: 'Unsplash',
    title: 'Sunset Beach',
    photographer: 'Thomas Kinto',
    photographer_profile: 'https://unsplash.com/@thomaskinto',
    alt_text: 'Beautiful sunset over ocean beach with waves',
    width: 1920,
    height: 1080,
    tags: ['sunset', 'beach', 'ocean', 'waves', 'golden hour']
  },
  {
    url: 'https://images.unsplash.com/photo-1464822759844-d150baec0494?w=1920&h=1080&fit=crop&crop=center',
    thumb_url: 'https://images.unsplash.com/photo-1464822759844-d150baec0494?w=400&h=300&fit=crop&crop=center',
    source: 'Unsplash',
    title: 'Mountain Valley',
    photographer: 'Qingbao Meng',
    photographer_profile: 'https://unsplash.com/@qingbao',
    alt_text: 'Green valley surrounded by towering mountains',
    width: 1920,
    height: 1080,
    tags: ['valley', 'mountains', 'green', 'pastoral', 'scenic']
  },
  {
    url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=1080&fit=crop&crop=center',
    thumb_url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop&crop=center',
    source: 'Unsplash',
    title: 'Autumn Forest',
    photographer: 'Lukasz Szmigiel',
    photographer_profile: 'https://unsplash.com/@szmigieldesign',
    alt_text: 'Colorful autumn forest with golden leaves',
    width: 1920,
    height: 1080,
    tags: ['autumn', 'forest', 'golden', 'leaves', 'fall']
  },
  {
    url: 'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=1920&h=1080&fit=crop&crop=center',
    thumb_url: 'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=400&h=300&fit=crop&crop=center',
    source: 'Unsplash',
    title: 'Tropical Paradise',
    photographer: 'Asad Photo Maldives',
    photographer_profile: 'https://unsplash.com/@asadphotography',
    alt_text: 'Crystal clear tropical waters with palm trees',
    width: 1920,
    height: 1080,
    tags: ['tropical', 'paradise', 'palm trees', 'clear water', 'beach']
  },
  {
    url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=1080&fit=crop&crop=center',
    thumb_url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop&crop=center',
    source: 'Unsplash',
    title: 'Northern Lights',
    photographer: 'Vincent Guth',
    photographer_profile: 'https://unsplash.com/@vincentguth',
    alt_text: 'Aurora borealis dancing over snowy landscape',
    width: 1920,
    height: 1080,
    tags: ['aurora', 'northern lights', 'snow', 'night', 'magical']
  },
  {
    url: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1920&h=1080&fit=crop&crop=center',
    thumb_url: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300&fit=crop&crop=center',
    source: 'Unsplash',
    title: 'Lavender Fields',
    photographer: 'Jared Erondu',
    photographer_profile: 'https://unsplash.com/@erondu',
    alt_text: 'Purple lavender fields stretching to horizon',
    width: 1920,
    height: 1080,
    tags: ['lavender', 'purple', 'fields', 'fragrant', 'provence']
  },
  {
    url: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1920&h=1080&fit=crop&crop=center',
    thumb_url: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=300&fit=crop&crop=center',
    source: 'Unsplash',
    title: 'Glacier Lake',
    photographer: 'Neom',
    photographer_profile: 'https://unsplash.com/@neom',
    alt_text: 'Pristine glacier lake with ice formations',
    width: 1920,
    height: 1080,
    tags: ['glacier', 'lake', 'ice', 'pristine', 'arctic']
  },
  {
    url: 'https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?w=1920&h=1080&fit=crop&crop=center',
    thumb_url: 'https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?w=400&h=300&fit=crop&crop=center',
    source: 'Unsplash',
    title: 'Rolling Hills',
    photographer: 'Tobias Tullius',
    photographer_profile: 'https://unsplash.com/@tobiastu',
    alt_text: 'Green rolling hills under blue sky',
    width: 1920,
    height: 1080,
    tags: ['hills', 'rolling', 'green', 'pastoral', 'countryside']
  },
  {
    url: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=1920&h=1080&fit=crop&crop=center',
    thumb_url: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=400&h=300&fit=crop&crop=center',
    source: 'Unsplash',
    title: 'Waterfall Canyon',
    photographer: 'Marc-Olivier Jodoin',
    photographer_profile: 'https://unsplash.com/@marcojodoin',
    alt_text: 'Majestic waterfall cascading down rocky canyon',
    width: 1920,
    height: 1080,
    tags: ['waterfall', 'canyon', 'rocks', 'cascade', 'power']
  },
  {
    url: 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=1920&h=1080&fit=crop&crop=center',
    thumb_url: 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=400&h=300&fit=crop&crop=center',
    source: 'Unsplash',
    title: 'Starry Night Sky',
    photographer: 'Greg Rakozy',
    photographer_profile: 'https://unsplash.com/@grakozy',
    alt_text: 'Milky Way galaxy over mountain silhouette',
    width: 1920,
    height: 1080,
    tags: ['stars', 'milky way', 'night', 'astronomy', 'cosmic']
  },
  {
    url: 'https://images.unsplash.com/photo-1501436513145-30f24e19fcc4?w=1920&h=1080&fit=crop&crop=center',
    thumb_url: 'https://images.unsplash.com/photo-1501436513145-30f24e19fcc4?w=400&h=300&fit=crop&crop=center',
    source: 'Unsplash',
    title: 'Cherry Blossoms',
    photographer: 'Sora Sagano',
    photographer_profile: 'https://unsplash.com/@sorasagano',
    alt_text: 'Pink cherry blossoms in full bloom',
    width: 1920,
    height: 1080,
    tags: ['cherry blossoms', 'pink', 'spring', 'delicate', 'japanese']
  },
  {
    url: 'https://images.unsplash.com/photo-1464822759844-d150baec0494?w=1920&h=1080&fit=crop&crop=center',
    thumb_url: 'https://images.unsplash.com/photo-1464822759844-d150baec0494?w=400&h=300&fit=crop&crop=center',
    source: 'Unsplash',
    title: 'Volcanic Landscape',
    photographer: 'Karsten Würth',
    photographer_profile: 'https://unsplash.com/@karsten_wuerth',
    alt_text: 'Dramatic volcanic landscape with lava formations',
    width: 1920,
    height: 1080,
    tags: ['volcanic', 'lava', 'dramatic', 'geological', 'raw']
  },
  {
    url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=1080&fit=crop&crop=center',
    thumb_url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop&crop=center',
    source: 'Unsplash',
    title: 'Bamboo Forest',
    photographer: 'Sora Sagano',
    photographer_profile: 'https://unsplash.com/@sorasagano',
    alt_text: 'Serene bamboo forest with filtered sunlight',
    width: 1920,
    height: 1080,
    tags: ['bamboo', 'forest', 'zen', 'peaceful', 'green']
  },
  {
    url: 'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=1920&h=1080&fit=crop&crop=center',
    thumb_url: 'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=400&h=300&fit=crop&crop=center',
    source: 'Unsplash',
    title: 'Scottish Highlands',
    photographer: 'Jonatan Pie',
    photographer_profile: 'https://unsplash.com/@r3dmax',
    alt_text: 'Rugged Scottish highlands with heather and mist',
    width: 1920,
    height: 1080,
    tags: ['scotland', 'highlands', 'heather', 'rugged', 'mist']
  }
];

async function main() {
  console.log('🌱 Starting database seed...');

  try {
    // Clear existing images
    await prisma.image.deleteMany({});
    console.log('🗑️  Cleared existing images');

    // Insert seed images
    for (const imageData of seedImages) {
      await prisma.image.create({
        data: imageData
      });
    }

    console.log(`✅ Successfully seeded ${seedImages.length} images`);
    console.log('🖼️  Images include:');
    seedImages.forEach((img, index) => {
      console.log(`   ${index + 1}. ${img.title} by ${img.photographer}`);
    });

  } catch (error) {
    console.error('❌ Error seeding database:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
