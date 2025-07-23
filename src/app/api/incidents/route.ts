import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const resolved = searchParams.get('resolved') === 'true'
    const incidents = await prisma.incident.findMany({
      where: { resolved },
      include: { camera: true },
      orderBy: { tsStart: 'desc' }
    })
    return NextResponse.json(incidents)
  } catch (error) {
    console.error('Error fetching incidents:', error)
    return NextResponse.json(
      { error: 'Failed to fetch incidents' },
      { status: 500 }
    )
  }
}

export async function PATCH(request: Request) {
  try {
    const url = new URL(request.url)
    const id = parseInt(url.pathname.split('/').pop()!)
    const inc = await prisma.incident.update({
      where: { id },
      data: { resolved: true },
      include: { camera: true }
    })
    return NextResponse.json(inc)
  } catch (error) {
    console.error('Error updating incident:', error)
    return NextResponse.json(
      { error: 'Failed to update incident' },
      { status: 500 }
    )
  }
}
