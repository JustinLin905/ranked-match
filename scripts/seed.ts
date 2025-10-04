import { PrismaClient, Term } from '../generated/prisma'

const prisma = new PrismaClient()

// Sample tags data
const sampleTags = [
  'Gaming',
  'Sports',
  'Music',
  'Art',
  'Photography',
  'Cooking',
  'Travel',
  'Fitness',
  'Reading',
  'Movies',
  'Technology',
  'Fashion',
  'Dancing',
  'Hiking',
  'Volunteering',
  'Entrepreneurship',
  'Languages',
  'Board Games',
  'Coffee',
  'Wine Tasting'
]

// Sample users data
const sampleUsers = [
  {
    email: 'alex.johnson@uwaterloo.ca',
    password: 'hashedpassword123',
    firstName: 'Alex',
    lastName: 'Johnson',
    program: 'Computer Science',
    highlights: ['Built a mobile app with 10k downloads', 'Led university hackathon team', 'Internship at Google'],
    term: Term.TERM_2A,
    sequence: { 'F24': true, 'S25': true, 'F25': false },
    bio: 'Passionate about technology and building meaningful connections. Love hiking and coffee!',
    active_in_cycle: true,
    instagram: '@alexjohnson',
    discord: 'alexj#1234',
    phone: '+1-555-0123',
    tags: ['Technology', 'Gaming', 'Coffee', 'Hiking']
  },
  {
    email: 'sarah.chen@uwaterloo.ca',
    password: 'hashedpassword456',
    firstName: 'Sarah',
    lastName: 'Chen',
    program: 'Engineering',
    highlights: ['Co-founded startup', 'Volunteer at local shelter', 'Photography portfolio'],
    term: Term.TERM_3A,
    sequence: { 'F23': true, 'S24': true, 'F24': true, 'S25': true },
    bio: 'Engineering student passionate about social impact and creative expression through photography.',
    active_in_cycle: true,
    instagram: '@sarahchenphoto',
    discord: 'sarahc#5678',
    phone: '+1-555-0456',
    tags: ['Photography', 'Volunteering', 'Entrepreneurship', 'Art']
  },
  {
    email: 'mike.rodriguez@uwaterloo.ca',
    password: 'hashedpassword789',
    firstName: 'Mike',
    lastName: 'Rodriguez',
    program: 'Mathematics',
    highlights: ['Math competition winner', 'Tutoring program coordinator', 'Guitar player'],
    term: Term.TERM_1B,
    sequence: { 'S25': true, 'F25': true },
    bio: 'Math enthusiast who loves music and helping others learn. Always up for board game nights!',
    active_in_cycle: true,
    instagram: '@mikerodmusic',
    discord: 'miker#9012',
    phone: '+1-555-0789',
    tags: ['Music', 'Board Games', 'Volunteering', 'Fitness']
  },
  {
    email: 'emma.wilson@uwaterloo.ca',
    password: 'hashedpassword101',
    firstName: 'Emma',
    lastName: 'Wilson',
    program: 'Business',
    highlights: ['Student council president', 'Dance team captain', 'Travel blogger'],
    term: Term.TERM_4A,
    sequence: { 'F22': true, 'S23': true, 'F23': true, 'S24': true, 'F24': true, 'S25': true },
    bio: 'Business student with a passion for leadership and dance. Love exploring new cultures through travel.',
    active_in_cycle: true,
    instagram: '@emmawilson',
    discord: 'emmaw#3456',
    phone: '+1-555-0101',
    tags: ['Dancing', 'Travel', 'Fashion', 'Languages']
  },
  {
    email: 'david.kim@uwaterloo.ca',
    password: 'hashedpassword202',
    firstName: 'David',
    lastName: 'Kim',
    program: 'Computer Science',
    highlights: ['Open source contributor', 'Rock climbing instructor', 'Coffee shop owner'],
    term: Term.TERM_2B,
    sequence: { 'S24': true, 'F24': true, 'S25': true },
    bio: 'CS student who codes by day and climbs rocks by weekend. Owns a small coffee shop downtown.',
    active_in_cycle: true,
    instagram: '@davidkimclimbs',
    discord: 'davidk#7890',
    phone: '+1-555-0202',
    tags: ['Technology', 'Coffee', 'Fitness', 'Entrepreneurship']
  },
  {
    email: 'lisa.patel@uwaterloo.ca',
    password: 'hashedpassword303',
    firstName: 'Lisa',
    lastName: 'Patel',
    program: 'Psychology',
    highlights: ['Mental health advocate', 'Yoga instructor', 'Book club founder'],
    term: Term.TERM_3B,
    sequence: { 'F23': true, 'S24': true, 'F24': true, 'S25': true },
    bio: 'Psychology student focused on mental health awareness. Love yoga, reading, and meaningful conversations.',
    active_in_cycle: true,
    instagram: '@lisapatelwellness',
    discord: 'lisap#1234',
    phone: '+1-555-0303',
    tags: ['Fitness', 'Reading', 'Volunteering', 'Languages']
  },
  {
    email: 'james.taylor@uwaterloo.ca',
    password: 'hashedpassword404',
    firstName: 'James',
    lastName: 'Taylor',
    program: 'Engineering',
    highlights: ['Robotics team lead', 'Movie critic', 'Wine enthusiast'],
    term: Term.TERM_5A,
    sequence: { 'F21': true, 'S22': true, 'F22': true, 'S23': true, 'F23': true, 'S24': true, 'F24': true, 'S25': true },
    bio: 'Engineering student with a love for robotics and cinema. Enjoy wine tasting and deep conversations.',
    active_in_cycle: true,
    instagram: '@jamestaylorfilms',
    discord: 'jamest#5678',
    phone: '+1-555-0404',
    tags: ['Technology', 'Movies', 'Wine Tasting', 'Board Games']
  },
  {
    email: 'sophia.martinez@uwaterloo.ca',
    password: 'hashedpassword505',
    firstName: 'Sophia',
    lastName: 'Martinez',
    program: 'Arts',
    highlights: ['Art gallery curator', 'Cooking show host', 'Language exchange organizer'],
    term: Term.TERM_1A,
    sequence: { 'F25': true, 'S26': false },
    bio: 'Arts student passionate about visual expression and cultural exchange. Love cooking and learning languages.',
    active_in_cycle: true,
    instagram: '@sophiamartinezart',
    discord: 'sophiam#9012',
    phone: '+1-555-0505',
    tags: ['Art', 'Cooking', 'Languages', 'Travel']
  },
  {
    email: 'ryan.lee@uwaterloo.ca',
    password: 'hashedpassword606',
    firstName: 'Ryan',
    lastName: 'Lee',
    program: 'Computer Science',
    highlights: ['AI research assistant', 'Gaming tournament winner', 'Tech blogger'],
    term: Term.TERM_4B,
    sequence: { 'F22': true, 'S23': true, 'F23': true, 'S24': true, 'F24': true, 'S25': true },
    bio: 'CS student focused on AI and machine learning. Competitive gamer and tech enthusiast.',
    active_in_cycle: true,
    instagram: '@ryanleegaming',
    discord: 'ryanl#3456',
    phone: '+1-555-0606',
    tags: ['Technology', 'Gaming', 'Movies', 'Coffee']
  },
  {
    email: 'olivia.brown@uwaterloo.ca',
    password: 'hashedpassword707',
    firstName: 'Olivia',
    lastName: 'Brown',
    program: 'Environmental Science',
    highlights: ['Climate action organizer', 'Hiking guide', 'Sustainable fashion advocate'],
    term: Term.TERM_2A,
    sequence: { 'F24': true, 'S25': true, 'F25': false },
    bio: 'Environmental science student committed to sustainability. Love outdoor adventures and eco-friendly living.',
    active_in_cycle: true,
    instagram: '@oliviabrownearth',
    discord: 'oliviab#7890',
    phone: '+1-555-0707',
    tags: ['Hiking', 'Fashion', 'Volunteering', 'Travel']
  }
]

async function main() {
  console.log('🌱 Starting database seeding...')

  // Create tags first
  console.log('📝 Creating tags...')
  for (const tagValue of sampleTags) {
    await prisma.tag.upsert({
      where: { value: tagValue },
      update: {},
      create: { value: tagValue }
    })
  }
  console.log(`✅ Created ${sampleTags.length} tags`)

  // Create users
  console.log('👥 Creating users...')
  for (const userData of sampleUsers) {
    const { tags, ...userInfo } = userData
    
    // Get tag records for this user
    const tagRecords = await prisma.tag.findMany({
      where: { value: { in: tags } }
    })

    await prisma.user.upsert({
      where: { email: userInfo.email },
      update: {
        ...userInfo,
        tags: {
          set: tagRecords.map(tag => ({ value: tag.value }))
        }
      },
      create: {
        ...userInfo,
        tags: {
          connect: tagRecords.map(tag => ({ value: tag.value }))
        }
      }
    })
  }
  console.log(`✅ Created ${sampleUsers.length} users`)

  // Display summary
  const userCount = await prisma.user.count()
  const tagCount = await prisma.tag.count()
  
  console.log('\n📊 Seeding Summary:')
  console.log(`   Users: ${userCount}`)
  console.log(`   Tags: ${tagCount}`)
  console.log('\n🎉 Database seeding completed successfully!')
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
