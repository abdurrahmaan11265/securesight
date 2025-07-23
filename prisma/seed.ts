const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()

async function main() {
  // 3 cameras
  const cams = await Promise.all([
    prisma.camera.upsert({ where: { id: 1 }, update: {}, create: { name: 'Shop Floor A', location: 'Shop Floor A' } }),
    prisma.camera.upsert({ where: { id: 2 }, update: {}, create: { name: 'Vault', location: 'Vault' } }),
    prisma.camera.upsert({ where: { id: 3 }, update: {}, create: { name: 'Entrance', location: 'Entrance' } }),
  ])

  // 12 incidents
  const types = ['Unauthorised Access','Gun Threat','Face Recognised','Loitering']
  const now = Date.now()
  for (let i = 0; i < 12; i++) {
    const cam = cams[i % 3]
    const start = new Date(now - Math.random() * 24*3600*1000)
    const end   = new Date(start.getTime() + 1000*60*(1 + Math.random()*5))
    await prisma.incident.create({
      data: {
        cameraId: cam.id,
        type: types[i % types.length],
        tsStart: start,
        tsEnd: end,
        thumbnailUrl: `/thumbnails/${(i%4)+1}.jpg`,
        resolved: false
      }
    })
  }
}

main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect())
